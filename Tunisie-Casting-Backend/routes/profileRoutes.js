// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware'); 
const User = require('../models/User'); 
const cloudinary = require('../config/cloudinary');
const multer = require('multer'); 
const streamifier = require('streamifier'); 



const upload = multer();


const uploadStream = (file) => {
    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(


            { resource_type: file.mimetype.startsWith('image') ? 'image' : 'video' },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
    });
};



router.get('/profile/me', authenticateToken, async (req, res) => {
    try {


        const user = await User.findById(req.userId).select('-password -resetToken -resetTokenExpiration');

        if (!user) {
            return res.status(404).json({ message: 'Profil utilisateur non trouvé.' });
        }


        const formattedUser = {
            ...user.toObject(), 
            languages: user.languages ? user.languages.join(', ') : '',
            styles: user.styles ? user.styles.join(', ') : '',
            skills: user.skills ? user.skills.join(', ') : '',
            type: user.profileType || 'Talent',
            id: user._id.toString() 
        };

        res.json(formattedUser); 
    } catch (error) {
        console.error('Erreur lors de la récupération du profil:', error);
        res.status(500).json({ message: 'Erreur interne du serveur lors de la récupération du profil.' });
    }
});



router.put('/profile/me', authenticateToken, upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'galleryPhotos', maxCount: 5 },
    { name: 'videos', maxCount: 2 }
]), async (req, res) => {
    const userId = req.userId; 

    const {
        name, email, phone, city, region, bio, type, 
        category, languages, styles, skills,
        specialty, experience, portfolioUrl,
        removeProfilePhoto, removeGalleryPhotoIndex, removeVideoIndex
    } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Profil utilisateur non trouvé.' });
        }



        user.name = name ?? user.name;
        user.email = email ?? user.email; 
        user.phone = phone ?? user.phone;
        user.city = city ?? user.city;
        user.region = region ?? user.region;
        user.bio = bio ?? user.bio;
        user.profileType = type ?? user.profileType; 

        // Mises à jour conditionnelles des champs spécifiques au type d'utilisateur
        if (user.profileType === 'Talent') {
            user.category = category ?? user.category;
            user.languages = languages ? languages.split(',').map(s => s.trim()) : [];
            user.styles = styles ? styles.split(',').map(s => s.trim()) : [];
            user.skills = skills ? skills.split(',').map(s => s.trim()) : [];
            // Remet à zéro les champs spécifiques aux Professionnels s'ils changent de type
            user.specialty = undefined;
            user.experience = undefined;
            user.portfolioUrl = undefined;
        } else if (user.profileType === 'Professional') {
            user.specialty = specialty ?? user.specialty;
            // Convertit l'expérience en nombre, gère les cas où elle est vide ou nulle.
            user.experience = experience !== null && experience !== '' ? parseInt(experience) : undefined;
            user.portfolioUrl = portfolioUrl ?? user.portfolioUrl;
            // Remet à zéro les champs spécifiques aux Talents s'ils changent de type
            user.category = undefined;
            user.languages = undefined;
            user.styles = undefined;
            user.skills = undefined;
        }

        // --- Gestion des suppressions de fichiers existants (sur Cloudinary et dans la BDD) ---
        if (removeProfilePhoto === 'true' && user.profilePhotoUrl) {

            await cloudinary.uploader.destroy(user.profilePhotoUrl.split('/').pop().split('.')[0]);
            user.profilePhotoUrl = undefined; 
        }
        
        

        if (Array.isArray(removeGalleryPhotoIndex)) {

            for (let i = removeGalleryPhotoIndex.length - 1; i >= 0; i--) {
                const indexToRemove = parseInt(removeGalleryPhotoIndex[i]);
                if (user.galleryPhotos[indexToRemove]) {
                    await cloudinary.uploader.destroy(user.galleryPhotos[indexToRemove].split('/').pop().split('.')[0]);
                    user.galleryPhotos.splice(indexToRemove, 1); 
                }
            }
        } else if (removeGalleryPhotoIndex !== undefined && user.galleryPhotos[parseInt(removeGalleryPhotoIndex)]) {

            await cloudinary.uploader.destroy(user.galleryPhotos[parseInt(removeGalleryPhotoIndex)].split('/').pop().split('.')[0]);
            user.galleryPhotos.splice(parseInt(removeGalleryPhotoIndex), 1);
        }


        if (Array.isArray(removeVideoIndex)) {
            for (let i = removeVideoIndex.length - 1; i >= 0; i--) {
                const indexToRemove = parseInt(removeVideoIndex[i]);
                if (user.videos[indexToRemove]) {
                    await cloudinary.uploader.destroy(user.videos[indexToRemove].split('/').pop().split('.')[0], { resource_type: 'video' });
                    user.videos.splice(indexToRemove, 1);
                }
            }
        } else if (removeVideoIndex !== undefined && user.videos[parseInt(removeVideoIndex)]) {
            await cloudinary.uploader.destroy(user.videos[parseInt(removeVideoIndex)].split('/').pop().split('.')[0], { resource_type: 'video' });
            user.videos.splice(parseInt(removeVideoIndex), 1);
        }

        // --- Gestion des nouveaux téléchargements de fichiers ---

        if (req.files && req.files.profilePhoto) {
            const result = await uploadStream(req.files.profilePhoto[0]);
            user.profilePhotoUrl = result.secure_url; 
        }

        if (req.files && req.files.galleryPhotos) {
            for (const file of req.files.galleryPhotos) {
                if (user.galleryPhotos.length < 5) {
                    const result = await uploadStream(file);
                    user.galleryPhotos.push(result.secure_url);
                } else {
                    console.warn('Limite de 5 photos de galerie atteinte. Le fichier ne sera pas ajouté.');
                    break; 
                }
            }
        }
        // Ajout de nouvelles vidéos 
        if (req.files && req.files.videos) {
            for (const file of req.files.videos) {
                if (user.videos.length < 2) {
                    const result = await uploadStream(file);
                    user.videos.push(result.secure_url);
                } else {
                    console.warn('Limite de 2 vidéos atteinte. Le fichier ne sera pas ajouté.');
                    break;
                }
            }
        }

        await user.save();


        const updatedUser = await User.findById(userId).select('-password -resetToken -resetTokenExpiration');
        const formattedUpdatedUser = {
            ...updatedUser.toObject(),
            languages: updatedUser.languages ? updatedUser.languages.join(', ') : '',
            styles: updatedUser.styles ? updatedUser.styles.join(', ') : '',
            skills: updatedUser.skills ? updatedUser.skills.join(', ') : '',
            type: updatedUser.profileType || 'Talent', 
            id: updatedUser._id.toString()
        };

        res.json({ message: 'Profil mis à jour avec succès !', user: formattedUpdatedUser });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du profil:', error);
        res.status(500).json({ message: 'Erreur interne du serveur lors de la mise à jour du profil.', error: error.message });
    }
});

module.exports = router;
