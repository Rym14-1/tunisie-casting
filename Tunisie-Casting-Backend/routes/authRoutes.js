//routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); 
const User = require('../models/User'); 



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_SERVICE_USER, 
        pass: process.env.EMAIL_SERVICE_PASS  
    }
});

// --- Route 1 : Inscription d'un nouvel utilisateur (POST /api/auth/register) ---
router.post('/register', async (req, res) => {

    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Un utilisateur existe déjà avec cet email.' });
        }

        user = new User({
            name, 
            email,
            password, 
            role: role || 'talent' 
        });


        await user.save();



        const payload = {
            id: user._id, 
            email: user.email,
            name: user.name, 
            role: user.role
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }, 
            (err, token) => {
                if (err) {
                    console.error('Erreur lors de la signature du token JWT:', err.message);
                    return res.status(500).send('Erreur interne du serveur.');
                }
                res.status(201).json({
                    msg: 'Inscription réussie.',
                    token,
                    user: {
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        role: user.role
                    }
                });
            }
        );

    } catch (err) {
        console.error('Erreur lors de l\'inscription:', err.message);
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


        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Identifiants invalides.' });
        }

        const payload = {
            id: user._id,
            email: user.email,
            name: user.name, 
            role: user.role
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, 
            { expiresIn: '1h' },
            (err, token) => {
                if (err) {
                    console.error('Erreur lors de la signature du token JWT:', err.message);
                    return res.status(500).send('Erreur interne du serveur.');
                }
                res.json({
                    msg: 'Connexion réussie.',
                    token,
                    user: { 
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        role: user.role
                    }
                });
            }
        );

    } catch (err) {
        console.error('Erreur lors de la connexion:', err.message);
        res.status(500).send('Erreur du serveur lors de la connexion.');
    }
});

// --- Route 3 : Demande de réinitialisation de mot de passe (POST /api/auth/forgot-password) ---
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {

            return res.json({ msg: 'Si cette adresse e-mail existe, un lien de réinitialisation a été envoyé.' });
        }



        if (!user.name) {
            user.name = 'Utilisateur Tunisie Casting'; 
            console.warn(`User with email ${user.email} had no name. Defaulting to '${user.name}' for password reset.`);
        }


        const resetToken = jwt.sign({ id: user._id }, process.env.RESET_PASSWORD_SECRET, { expiresIn: '1h' });


        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; 
        await user.save(); 

        //  lien de réinitialisation à envoyer par email
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

        const mailOptions = {
            from: process.env.EMAIL_SERVICE_USER,
            to: user.email,
            subject: 'Réinitialisation de votre mot de passe Tunisie Casting',
            html: `
                <p>Bonjour ${user.name},</p>
                <p>Vous avez demandé une réinitialisation de mot de passe. Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
                <p><a href="${resetLink}">Réinitialiser mon mot de passe</a></p>
                <p>Ce lien expirera dans une heure.</p>
                <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail.</p>
                <p>Cordialement,</p>
                <p>L'équipe Tunisie Casting</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email de réinitialisation envoyé à ${user.email}`);
        res.json({ msg: 'Si cette adresse e-mail existe, un lien de réinitialisation a été envoyé.' });

    } catch (err) {
        console.error('Erreur lors de l\'envoi de l\'e-mail de réinitialisation:', err);

        if (err.name === 'ValidationError') {
             console.error('Détail de l\'erreur de validation:', err.errors);
             res.status(400).json({ msg: 'Erreur de validation: un champ requis est manquant. Vérifiez le nom de l\'utilisateur.' });
        } else {
             res.status(500).json({ msg: 'Erreur lors de l\'envoi de l\'e-mail de réinitialisation.' });
        }
    }
});

// --- Route 4 : Réinitialisation effective du mot de passe (POST /api/auth/reset-password) ---
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ msg: 'Token et nouveau mot de passe sont requis.' });
    }

    try {
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() } 
        });

        if (!user) {
            return res.status(400).json({ msg: 'Lien de réinitialisation invalide ou expiré.' });
        }

        user.password = newPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;

        await user.save();

        res.json({ msg: 'Votre mot de passe a été réinitialisé avec succès.' });

    } catch (err) {
        console.error('Erreur lors de la réinitialisation du mot de passe:', err);
        res.status(500).json({ msg: 'Erreur interne du serveur lors de la réinitialisation du mot de passe.' });
    }
});

module.exports = router;
