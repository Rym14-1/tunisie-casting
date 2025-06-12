// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Le nom d\'utilisateur est requis'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'L\'adresse email est requise'],
        unique: true,
        match: [/.+@.+\..+/, 'Veuillez utiliser une adresse email valide']
    },
    password: {
        type: String,
        required: [true, 'Le mot de passe est requis'],
        minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères']
    },
    role: { 
        type: String,
        enum: ['talent', 'professional_tech', 'casting_director', 'admin'],
        default: 'talent', 
        required: true
    },
    // --- Infos spécifiques aux rôles ---
    profile: { 
        bio: { type: String, maxlength: [1000, 'La bio ne peut pas dépasser 1000 caractères'] },
        profilePicture: { type: String, default: 'https://res.cloudinary.com/ton_nom_cloud/image/upload/v1/tunisie-casting/default-avatar.jpg' }, // Remplace 'cloud'
        portfolioPhotos: [{ type: String }], 
        portfolioVideos: [{ type: String }], 
        contactInfo: {
            phone: String,
            website: String,
            instagram: String,
            facebook: String
        },
        talentDetails: {
            categories: [{ 
                type: String,
                enum: ['acteur', 'modèle', 'danseur', 'musicien', 'chanteur', 'artiste_voix', 'influenceur', 'autre']
            }],
            age: Number,
            gender: { type: String, enum: ['Homme', 'Femme', 'Autre', 'Non spécifié'] },
            languages: [{ type: String }], 
            skills: [{ type: String }], 
            experience: String, 
            availability: String, 
            rates: String, 
            height: Number, 
            weight: Number, 
            eyeColor: String,
            hairColor: String
        },
        // Pour les professionnels techniques
        professionalDetails: {
            specialties: [{ 
                type: String,
                enum: ['photographe', 'vidéaste', 'monteur', 'réalisateur', 'DOP', 'technicien_lumiere', 'technicien_son', 'community_manager', 'autre']
            }],
            experienceYears: Number,
            certifications: [{ type: String }], 
            equipment: [{ type: String }], 
            availability: String, 
            rates: String, 
            pastProjects: [{ 
                title: String,
                description: String,
                link: String 
            }]
        }
    },
    // --- Informations d'abonnement ---
    subscription: {
        plan: {
            type: String,
            enum: ['free', 'basic', 'pro', 'premium'],
            default: 'free'
        },
        startDate: { type: Date },
        endDate: { type: Date },
        isActive: { type: Boolean, default: false }
    },
    // --- Autres infos ---
    dateJoined: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);