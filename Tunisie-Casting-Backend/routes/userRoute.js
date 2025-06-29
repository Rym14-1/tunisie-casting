// backend/routes/userRoute.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const User = require('../models/User'); // Importe le modèle User



router.get('/professionals', async (req, res) => {
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
        const user = await User.findById(req.params.id).select('-password'); 
        if (!user) {
            return res.status(404).json({ msg: 'User not found.' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);

        if (err.name === 'CastError') {
            return res.status(400).json({ msg: 'ID utilisateur invalide.' });
        }
        res.status(500).send('Server error.');
    }
});


router.get('/me', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'Authenticated user not found.' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

module.exports = router;
