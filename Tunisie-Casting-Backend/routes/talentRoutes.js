// routes/talentRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); 


router.get('/', async (req, res) => {
    try {
        const { category, city, region, languages, styles, skills, gender } = req.query;

        const query = { profileType: 'Talent' }; 

        if (category) {
            query.category = { $regex: category, $options: 'i' }; 
        }
        if (city) {
            query.city = { $regex: city, $options: 'i' };
        }
        if (region) {
            query.region = { $regex: region, $options: 'i' };
        }
        if (gender && gender !== 'Any') {
            query.gender = gender;
        }

        if (languages) {
            const langsArray = languages.split(',').map(s => s.trim());
            if (langsArray.length > 0) {
                query.languages = { $in: langsArray };
            }
        }
        if (styles) {
            const stylesArray = styles.split(',').map(s => s.trim());
            if (stylesArray.length > 0) {
                query.styles = { $in: stylesArray };
            }
        }
        if (skills) {
            const skillsArray = skills.split(',').map(s => s.trim());
            if (skillsArray.length > 0) {
                query.skills = { $in: skillsArray };
            }
        }

        const talents = await User.find(query).select('-password -resetToken -resetTokenExpiration');

        res.json(talents);
    } catch (err) {
        console.error('Erreur lors de la recherche des talents:', err.message);
        res.status(500).json({ message: 'Erreur interne du serveur lors de la recherche des talents.' });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const talentId = req.params.id;
        // Récupère l'utilisateur par ID, s'assurant que c'est bien un profil de type 'Talent'
        const talent = await User.findOne({ _id: talentId, profileType: 'Talent' })
                                  .select('-password -resetToken -resetTokenExpiration');

        if (!talent) {
            return res.status(404).json({ message: 'Talent non trouvé.' });
        }


        const formattedTalent = {
            id: talent._id,
            name: talent.name,

            profilePic: talent.profilePhotoUrl || 'https://via.placeholder.com/300x300/e2e8f0/6b7280?text=Profil',
            category: talent.category,

            location: talent.city && talent.region ? `${talent.city}, ${talent.region}` : talent.city || talent.region || 'Non spécifié',
            bio: talent.bio,
            email: talent.email,
            phone: talent.phone,
            languages: talent.languages || [], 
            // Ajout d'autres champs si  frontend les affiche conditionnellement pour les abonnés
            galleryPhotos: talent.galleryPhotos || [],
            videos: talent.videos || [],
            skills: talent.skills || [],
            styles: talent.styles || []
        };

        res.json(formattedTalent);
    } catch (err) {
        console.error('Erreur lors de la récupération du talent par ID:', err.message);

        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'ID de talent invalide.' });
        }
        res.status(500).json({ message: 'Erreur interne du serveur lors de la récupération du talent.' });
    }
});

module.exports = router;
