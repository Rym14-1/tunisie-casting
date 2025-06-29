// backend/routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware'); 
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');        
const User = require('../models/User');              
const Notification = require('../models/Notification'); 



module.exports = (io) => {



    router.get('/users/:userId/conversations', authenticateToken, async (req, res) => {
        const requestedUserId = req.params.userId;

        if (req.userId.toString() !== requestedUserId) {
            return res.status(403).json({ message: 'Accès non autorisé aux conversations de cet utilisateur.' });
        }

        try {
            const conversations = await Conversation.find({ participants: requestedUserId })
                .populate('participants', 'name email')
                .lean();

            const conversationsWithDetails = await Promise.all(conversations.map(async (conv) => {
                const lastMessage = await Message.findOne({ conversation: conv._id })
                    .sort({ timestamp: -1 })
                    .limit(1);

                const unreadMessagesCount = await Message.countDocuments({
                    conversation: conv._id,
                    sender: { $ne: requestedUserId },
                    readBy: { $nin: [requestedUserId] }
                });

                return {
                    id: conv._id,
                    name: conv.name,
                    type: conv.type,
                    participants: conv.participants,
                    lastMessageTime: lastMessage ? lastMessage.timestamp : conv.createdAt,
                    unreadCount: unreadMessagesCount
                };
            }));

            conversationsWithDetails.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));

            res.json(conversationsWithDetails);
        } catch (error) {
            console.error('Erreur lors du chargement des conversations:', error);
            res.status(500).json({ message: 'Erreur interne du serveur lors du chargement des conversations.' });
        }
    });


    router.get('/conversations/:conversationId', authenticateToken, async (req, res) => {
        const conversationId = req.params.conversationId;
        const userId = req.userId;

        try {
            const conversation = await Conversation.findById(conversationId).populate('participants', 'name email');

            if (!conversation) {
                return res.status(404).json({ message: 'Conversation non trouvée.' });
            }
            if (!conversation.participants.some(p => p._id.toString() === userId.toString())) {
                return res.status(403).json({ message: 'Accès non autorisé à cette conversation.' });
            }
            res.json(conversation);
        } catch (error) {
            console.error('Erreur lors du chargement des détails de la conversation:', error);
            res.status(500).json({ message: 'Erreur interne du serveur lors du chargement des détails de la conversation.' });
        }
    });


    router.get('/conversations/:conversationId/messages', authenticateToken, async (req, res) => {
        const conversationId = req.params.conversationId;
        const userId = req.userId;

        try {
            const conversation = await Conversation.findById(conversationId);
            if (!conversation || !conversation.participants.some(p => p._id.toString() === userId.toString())) {
                return res.status(403).json({ message: 'Accès non autorisé à cette conversation ou conversation non trouvée.' });
            }

            const messages = await Message.find({ conversation: conversationId })
                .populate('sender', 'name email')
                .sort({ timestamp: 1 })
                .lean();

            await Message.updateMany(
                { conversation: conversationId, sender: { $ne: userId }, readBy: { $ne: userId } },
                { $addToSet: { readBy: userId } }
            );

            await Notification.deleteMany({ user: userId, type: 'message', targetId: conversationId, isRead: false });


            res.json(messages);
        } catch (error) {
            console.error('Erreur lors du chargement des messages:', error);
            res.status(500).json({ message: 'Erreur interne du serveur lors du chargement des messages.' });
        }
    });


    router.post('/messages', authenticateToken, async (req, res) => {
        const { conversation_id, content } = req.body;
        const senderId = req.userId;

        try {
            const conversation = await Conversation.findById(conversation_id);
            if (!conversation || !conversation.participants.some(p => p._id.toString() === senderId.toString())) {
                return res.status(403).json({ message: 'Conversation non trouvée ou non autorisée pour cet expéditeur.' });
            }

            const senderUser = await User.findById(senderId);
            if (!senderUser) {
                return res.status(400).json({ message: 'Expéditeur non trouvé.' });
            }

            const newMessage = new Message({
                conversation: conversation_id,
                sender: senderId,
                content,
                readBy: [senderId]
            });
            await newMessage.save();

            conversation.updatedAt = new Date();
            await conversation.save();


            const populatedMessage = await Message.findById(newMessage._id).populate('sender', 'name email').lean();

            io.to(`conversation-${conversation_id}`).emit('newMessage', populatedMessage);

            conversation.participants.forEach(async (participantId) => {
                if (participantId.toString() !== senderId.toString()) {
                    const newNotification = new Notification({
                        user: participantId,
                        message: `Nouveau message de ${senderUser.name} dans "${conversation.name || 'une conversation'}"`,
                        type: 'message',
                        targetId: conversation_id,
                        isRead: false
                    });
                    await newNotification.save();
                    io.to(`user-${participantId}`).emit('newNotification', newNotification);
                }
            });

            res.status(201).json(populatedMessage);
        } catch (error) {
            console.error('Erreur lors de l\'envoi du message:', error);
            res.status(500).json({ message: 'Erreur interne du serveur lors de l\'envoi du message.' });
        }
    });


    router.put('/conversations/:id/read', authenticateToken, async (req, res) => {
        const conversationId = req.params.id;
        const userId = req.userId;

        try {
            const conversation = await Conversation.findById(conversationId);
            if (!conversation || !conversation.participants.some(p => p._id.toString() === userId.toString())) {
                return res.status(403).json({ message: 'Conversation non trouvée ou non autorisée.' });
            }

            await Message.updateMany(
                { conversation: conversationId, sender: { $ne: userId }, readBy: { $ne: userId } },
                { $addToSet: { readBy: userId } }
            );

            await Notification.deleteMany({ user: userId, type: 'message', targetId: conversationId, isRead: false });

            res.status(200).json({ message: 'Conversation marquée comme lue et notifications nettoyées.' });
        } catch (error) {
            console.error('Erreur lors du marquage de la conversation comme lue:', error);
            res.status(500).json({ message: 'Erreur interne du serveur.' });
        }
    });


    return router;
};
