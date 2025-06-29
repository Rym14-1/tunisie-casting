// models/Service.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({

    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, min: 0 },
    category: { type: String, trim: true }, 
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
    
});

module.exports = mongoose.model('Service', serviceSchema);
