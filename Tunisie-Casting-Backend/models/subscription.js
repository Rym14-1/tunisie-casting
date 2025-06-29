// models/Subscription.js
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
        unique: true 
    },
    plan: {
        type: String,
        required: true,
        enum: ['Basic', 'Pro', 'Premium'] 
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive', 'cancelled', 'pending'],
        default: 'pending' 
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    billingCycle: {
        type: String,
        required: true,
        enum: ['monthly', 'yearly'] 
    },
    transactionId: {
        type: String,
        trim: true,
        sparse: true 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

subscriptionSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
