// models/CastingCall.js
const mongoose = require('mongoose');

const CastingCallSchema = new mongoose.Schema({
    castingDirector: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    title: {
        type: String,
        required: [true, 'Le titre de l\'annonce est requis'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'La description est requise']
    },
    location: {
        type: String,
        required: [true, 'Le lieu est requis']
    },
    deadline: { 
        type: Date,
        required: [true, 'La date limite est requise']
    },
    compensation: { 
        type: String,
        enum: ['Rémunéré', 'Non Rémunéré', 'À discuter', 'Autre'],
        default: 'À discuter'
    },
    roles: [{ 
        roleName: { type: String, required: true },
        ageRange: String, 
        gender: { type: String, enum: ['Homme', 'Femme', 'Non spécifié'] },
        description: String
    }],
    status: { 
        type: String,
        enum: ['open', 'closed', 'archived'],
        default: 'open'
    },
    datePosted: {
        type: Date,
        default: Date.now 
    }
}, { timestamps: true });

module.exports = mongoose.model('CastingCall', CastingCallSchema);