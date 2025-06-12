// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); 
const roleMiddleware = require('../middleware/roleMiddleware'); 
const User = require('../models/user'); 

// @route   GET /api/talents/profile
// @desc    Obtenir le profil du talent connecté
// @access  Privé 
router.get('/talents/profile', authMiddleware, roleMiddleware('talent'), async (req, res) => {
    try {
        const profile = await User.findById(req.user.id).select('-password');

        if (!profile) {
            return res.status(404).json({ msg: 'Profil de talent non trouvé.' });
        }

        if (profile.role !== 'talent') {
            return res.status(403).json({ msg: 'Accès refusé. Rôle incorrect pour cette ressource.' });
        }

        res.json(profile); 
    } catch (err) {
        console.error(err.message);

        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'ID utilisateur invalide.' });
        }
        res.status(500).send('Erreur serveur lors du chargement du profil talent.');
    }
});

// @route   GET /api/professionals/profile
// @desc    Obtenir le profil du professionnel/directeur de casting connecté
// @access  Privé 
router.get('/professionals/profile', authMiddleware, roleMiddleware('professional_tech', 'casting_director'), async (req, res) => {
    try {
        const profile = await User.findById(req.user.id).select('-password');

        if (!profile) {
            return res.status(404).json({ msg: 'Profil de professionnel/directeur de casting non trouvé.' });
        }

        if (!['professional_tech', 'casting_director'].includes(profile.role)) {
            return res.status(403).json({ msg: 'Accès refusé. Rôle incorrect pour cette ressource.' });
        }

        res.json(profile); 
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'ID utilisateur invalide.' });
        }
        res.status(500).send('Erreur serveur lors du chargement du profil professionnel.');
    }
});

module.exports = router;