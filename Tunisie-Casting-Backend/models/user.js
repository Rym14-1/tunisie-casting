// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ['talent', 'professional', 'admin'], default: 'talent' }, 
    phone: { type: String, trim: true },
    city: { type: String, trim: true },
    region: { type: String, trim: true },
    bio: { type: String, trim: true, maxlength: 1000 },
    
    profileType: { type: String, enum: ['Talent', 'Professional'], default: 'Talent' },
    gender: { type: String, enum: ['Male', 'Female', 'Other', 'Any'], default: 'Any' },

    // Talent
    category: { type: String, trim: true },
    languages: [{ type: String, trim: true }],
    styles: [{ type: String, trim: true }],
    skills: [{ type : String, trim: true }],

    // Professional
    specialty: { type: String, trim: true },
    experience: { type: Number, min: 0 },
    portfolioUrl: { type: String, trim: true },

    profilePhotoUrl: { type: String }, 
    galleryPhotos: [{ type: String }],
    videos: [{ type: String }],

    resetToken: String,
    resetTokenExpiration: Date,

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password') && this.password) { 
        this.password = await bcrypt.hash(this.password, 10);
    }
    this.updatedAt = Date.now(); 
    next();
});

userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
