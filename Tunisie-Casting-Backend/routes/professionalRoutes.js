// routes/professionalRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); 



router.get('/', async (req, res) => {
    try {
        const { specialty, experience, location } = req.query;


        const query = { profileType: 'Professional' };


        if (specialty) {

            query.specialty = { $regex: specialty, $options: 'i' }; 
        }
        if (location) {

            query.city = { $regex: location, $options: 'i' };
        }
        if (experience) {

            if (experience === 'junior') {
                query.experience = { $gte: 0, $lte: 2 }; 
            } else if (experience === 'confirme') {
                query.experience = { $gte: 3, $lte: 5 };
            } else if (experience === 'senior') {
                query.experience = { $gte: 6 }; 
            }
        }

        const professionals = await User.find(query)
                                        .select('-password -resetToken -resetTokenExpiration');
        
        res.json(professionals);
    } catch (err) {
        console.error('Erreur lors de la récupération des professionnels avec filtres:', err.message);
        res.status(500).json({ message: 'Erreur interne du serveur lors du chargement des professionnels.' });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const professionalId = req.params.id;
        // Récupère l'utilisateur par ID, s'assurant que c'est bien un profil de type 'Professional'
        const professional = await User.findOne({ _id: professionalId, profileType: 'Professional' })
                                        .select('-password -resetToken -resetTokenExpiration');

        if (!professional) {
            return res.status(404).json({ message: 'Professionnel non trouvé.' });
        }

        // Formate l'objet professionnel pour le frontend afin de correspondre aux props attendues
        const formattedProfessional = {
            id: professional._id,
            name: professional.name,
            profilePic: professional.profilePhotoUrl || 'https://via.placeholder.com/300x300/e2e8f0/6b7280?text=PROFIL',
            specialty: professional.specialty,
            experience: professional.experience, 
            location: professional.city,
            bio: professional.bio,
            email: professional.email,
            phone: professional.phone,
            portfolioUrl: professional.portfolioUrl,
            galleryPhotos: professional.galleryPhotos || [],
            videos: professional.videos || []
        };

        res.json(formattedProfessional);
    } catch (err) {
        console.error('Erreur lors de la récupération du professionnel par ID:', err.message);
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'ID de professionnel invalide.' });
        }
        res.status(500).json({ message: 'Erreur interne du serveur lors de la récupération du professionnel.' });
    }
});

module.exports = router;
