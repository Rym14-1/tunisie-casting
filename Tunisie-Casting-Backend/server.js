// server.js

// Charge les variables d'environnement du fichier .env
require('dotenv').config();

// Importe les modules nécessaires
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importe les fichiers de routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoute'); // Assurez-vous que ce fichier existe si vous l'utilisez
const castingCallRoutes = require('./routes/castingCallRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const formationRoutes = require('./routes/formationRoutes');
const profileRoutes = require('./routes/profileRoutes'); // <-- Importation de vos routes de profil

// Crée une instance de l'application Express
const app = express();

// Définit le port d'écoute du serveur
const PORT = process.env.PORT || 5000;

// --- Middlewares globaux ---

// 1. Configuration CORS : Crucial pour permettre les requêtes depuis votre frontend Vue.js
app.use(cors({
    origin: 'http://localhost:5173', // <--- TRÈS IMPORTANT : L'URL EXACTE de votre frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Méthodes HTTP autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés (pour le token d'authentification)
    credentials: true // Permet l'envoi de cookies d'authentification si utilisés
}));

// 2. Analyse les requêtes avec un corps JSON
app.use(express.json());

// 3. Analyse les requêtes URL-encoded (utile pour les formulaires HTML)
app.use(express.urlencoded({ extended: true }));

// --- Connexion à la Base de Données MongoDB ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connecté à MongoDB !'))
    .catch(err => console.error('❌ Erreur de connexion à MongoDB :', err));

// --- Définition des routes API ---
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/casting-calls', castingCallRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/formations', formationRoutes);
app.use('/api', profileRoutes); 

app.get('/', (req, res) => {
    res.send('Bienvenue sur le backend de Tunisie Casting !');
});

// --- Middleware de gestion des erreurs global ---
app.use((err, req, res, next) => {
    console.error('SERVER ERROR:', err.stack);
    if (res.headersSent) {
        return next(err);
    }
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'Oups ! Une erreur interne est survenue sur le serveur.',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
});

// --- Démarrage du Serveur ---
app.listen(PORT, () => {
    console.log(`🚀 Serveur en marche sur le port ${PORT}`);
});