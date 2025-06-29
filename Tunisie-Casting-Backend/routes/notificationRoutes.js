// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const Notification = require('../models/Notification'); 
const User = require('../models/User'); 
module.exports = (io) => { 


    router.get('/user/notifications', authenticateToken, async (req, res) => {
        try {
            const userId = req.userId;
            const notifications = await Notification.find({ user: userId })
                                                .sort({ timestamp: -1 }); 
            res.json(notifications);
        } catch (error) {
            console.error('Error loading notifications:', error);
            res.status(500).json({ message: 'Internal server error while loading notifications.' });
        }
    });


    router.put('/notifications/:id/read', authenticateToken, async (req, res) => {
        const notificationId = req.params.id;
        const userId = req.userId;

        try {
            const notification = await Notification.findOneAndUpdate(
                { _id: notificationId, user: userId }, 
                { isRead: true },
                { new: true } 
            );

            if (!notification) {
                return res.status(404).json({ message: 'Notification not found or not authorized.' });
            }
            res.json({ message: 'Notification marked as read.', notification });
        } catch (error) {
            console.error('Error marking notification as read:', error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    });


    router.delete('/notifications/:id', authenticateToken, async (req, res) => {
        const notificationId = req.params.id;
        const userId = req.userId;

        try {
            const result = await Notification.deleteOne({ _id: notificationId, user: userId });

            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Notification not found or not authorized.' });
            }
            res.status(204).send(); 
        } catch (error) {
            console.error('Error deleting notification:', error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    });


    router.delete('/user/notifications', authenticateToken, async (req, res) => {
        const userId = req.userId;

        try {
            const result = await Notification.deleteMany({ user: userId });

            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'No notifications found for this user.' });
            }
            res.status(204).send();
        } catch (error) {
            console.error('Error deleting all notifications:', error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    });

    return router;
};
