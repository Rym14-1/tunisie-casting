// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

    conversation: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Conversation', 
        required: true 
    },

    sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },

    content: { 
        type: String, 
        required: true,
        trim: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    },

    attachment: {
        url: { type: String },    
        type: { type: String },   
        name: { type: String },   
        size: { type: Number }   
    },

    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] 
});


messageSchema.index({ conversation: 1, timestamp: 1 }); 
messageSchema.index({ sender: 1 }); 


module.exports = mongoose.model('Message', messageSchema);
