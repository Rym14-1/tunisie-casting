// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); 
const roleMiddleware = require('../middleware/roleMiddleware'); 
const User = require('../models/user'); 

// @route   GET /api/talents/profile
// @desc    
// @access  
router.get('/talents/profile', authMiddleware, roleMiddleware('talent'), async (req, res) => {
    try {

        const profile = await User.findById(req.user.id).select('-password -tokens');

        if (!profile) {
            return res.status(404).json({ msg: 'Profil de talent non trouvé.' });
        }

        const responseData = {
            ...profile.toObject(), 
            type: 'Talent' 
        };

        res.json(responseData);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') { 
            return res.status(400).json({ msg: 'ID utilisateur invalide.' });
        }
        res.status(500).send('Erreur serveur lors du chargement du profil talent.');
    }
});

// @route   GET /api/professionals/profile
// @desc   
// @access  
router.get('/professionals/profile', authMiddleware, roleMiddleware('professional_tech', 'casting_director'), async (req, res) => {
    try {
        const profile = await User.findById(req.user.id).select('-password -tokens');

        if (!profile) {
            return res.status(404).json({ msg: 'Profil de professionnel/directeur de casting non trouvé.' });
        }

        const responseData = {
            ...profile.toObject(),
            type: 'Professional' 
        };

        res.json(responseData);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'ID utilisateur invalide.' });
        }
        res.status(500).send('Erreur serveur lors du chargement du profil professionnel.');
    }
});

// @route   PUT /api/talents/profile
// @desc   
// @access  

router.put('/talents/profile', authMiddleware, roleMiddleware('talent'), async (req, res) => {
    const { name, phone, city, region, bio, category, languages, styles, skills } = req.body;

    const profileFields = {
        name, phone, city, region, bio, category,
        languages: languages ? JSON.parse(languages) : [], 
        styles: styles ? JSON.parse(styles) : [],
        skills: skills ? JSON.parse(skills) : [],
    };


    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'Utilisateur non trouvé.' });
        }

        Object.assign(user, profileFields);


        await user.save();
        res.json({ message: 'Profil talent mis à jour avec succès.', profile: user });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur lors de la mise à jour du profil talent.');
    }
});

// @route   PUT /api/professionals/profile
// @desc    
// @access  
router.put('/professionals/profile', authMiddleware, roleMiddleware('professional_tech', 'casting_director'), async (req, res) => {
    const { name, phone, city, region, bio, specialty, experience, portfolioUrl } = req.body;

    const profileFields = {
        name, phone, city, region, bio, specialty, experience, portfolioUrl
    };

    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'Utilisateur non trouvé.' });
        }

        Object.assign(user, profileFields);
        await user.save();
        res.json({ message: 'Profil professionnel mis à jour avec succès.', profile: user });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur lors de la mise à jour du profil professionnel.');
    }
});


module.exports = router;