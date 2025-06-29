// models/Formation.js
const mongoose = require('mongoose');

const formationSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    duration: { type: String, trim: true }, 
    price: { type: Number, min: 0 },
    startDate: { type: Date },
    endDate: { type: Date },
    location: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Formation', formationSchema);
