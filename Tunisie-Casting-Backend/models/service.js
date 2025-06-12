// models/Service.js
const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: { 
        type: Number,
        required: true
    },
    duration: String, 
    category: { 
        type: String,
        enum: ['shooting_photo', 'creation_book', 'autre'],
        required: true
    },
    images: [{ type: String }], 
    availability: [{ 
        date: Date,
        slots: [{
            time: String, 
            isBooked: { type: Boolean, default: false }
        }]
    }],
    dateCreated: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);