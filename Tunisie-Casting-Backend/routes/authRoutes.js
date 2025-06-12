// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Assurez-vous que le chemin vers votre modèle User est correct

// --- Route 1 : Inscription d'un nouvel utilisateur (POST /api/auth/register) ---
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Un utilisateur existe déjà avec cet email.' });
        }

        user = new User({
            username,
            email,
            password,
            role: role || 'talent' // Définit 'talent' par défaut si aucun rôle n'est spécifié
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, // Assurez-vous que cette variable d'environnement est définie dans .env
            { expiresIn: '1h' }, // Le token expire après 1 heure
            (err, token) => {
                if (err) throw err;
                // CHANGEMENT CLÉ : Enveloppe les détails de l'utilisateur dans un objet 'user'
                res.json({
                    token,
                    user: {
                        id: user.id,
                        email: user.email, // Inclure l'email pour le frontend
                        role: user.role
                    }
                });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur lors de l\'inscription.');
    }
});

// --- Route 2 : Connexion d'un utilisateur (POST /api/auth/login) ---
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Identifiants invalides.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Identifiants invalides.' });
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, // Assurez-vous que cette variable d'environnement est définie dans .env
            { expiresIn: '1h' }, // Le token expire après 1 heure
            (err, token) => {
                if (err) throw err;
                // CHANGEMENT CLÉ : Enveloppe les détails de l'utilisateur dans un objet 'user'
                res.json({
                    token,
                    user: {
                        id: user.id,
                        email: user.email, // Inclure l'email pour le frontend
                        role: user.role
                    }
                });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur lors de la connexion.');
    }
});

module.exports = router;