// models/Formation.js
const mongoose = require('mongoose');

const FormationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: String, 
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    category: { 
        type: String,
        enum: ['modeling', 'acting', 'montage_video', 'autre'],
        required: true
    },
    maxParticipants: Number,
    currentParticipants: {
        type: Number,
        default: 0
    },
    testimonials: [{ 
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: Number,
        comment: String,
        date: { type: Date, default: Date.now }
    }],
    dateCreated: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Formation', FormationSchema);