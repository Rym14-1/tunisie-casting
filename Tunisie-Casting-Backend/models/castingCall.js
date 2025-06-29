// models/CastingCall.js
const mongoose = require('mongoose');

const castingCallSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    projectType: { type: String, trim: true }, 
   
    roles: [{
        name: { type: String, required: true, trim: true },
        gender: { type: String, enum: ['Male', 'Female', 'Other', 'Any'] },
        ageRange: { type: String, trim: true },
        details: { type: String, trim: true }
    }],
    
    applicationDeadline: { type: Date },
    location: { type: String, trim: true },
    contactEmail: { type: String, trim: true },


    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CastingCall', castingCallSchema);
