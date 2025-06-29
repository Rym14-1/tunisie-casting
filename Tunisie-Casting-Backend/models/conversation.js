// models/Conversation.js
const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({


    name: { 
        type: String,
        trim: true 
    }, 


    participants: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true 
        }
    ],

    type: { 
        type: String, 
        enum: ['direct', 'group'], 
        default: 'direct' 
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


conversationSchema.index({ participants: 1 });


module.exports = mongoose.model('Conversation', conversationSchema);
