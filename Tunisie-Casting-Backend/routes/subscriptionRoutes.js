// routes/subscriptionRoutes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const Subscription = require('../models/Subscription');

router.get('/:userId', authenticateToken, async (req, res) => {
    try {
        if (req.userId.toString() !== req.params.userId && req.userRole !== 'admin') {
            return res.status(403).json({ message: 'Access denied.' });
        }

        const subscriptions = await Subscription.find({ user: req.params.userId }).populate('user', 'name email');
        res.json(subscriptions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

router.post('/', authenticateToken, async (req, res) => {
    const { plan, billingCycle, price, transactionId } = req.body;
    const userId = req.userId; 

    if (!plan || !billingCycle || price === undefined || price === null) {
        return res.status(400).json({ message: 'Please provide plan, billing cycle, and price.' });
    }

    try {
        const startDate = new Date();
        let endDate = new Date();

        if (billingCycle === 'monthly') {
            endDate.setMonth(endDate.getMonth() + 1);
        } else if (billingCycle === 'yearly') {
            endDate.setFullYear(endDate.getFullYear() + 1);
        } else {
            return res.status(400).json({ message: 'Invalid billing cycle. Must be "monthly" or "yearly".' });
        }

        let subscription = await Subscription.findOne({ user: userId });

        if (subscription) {
            subscription.plan = plan;
            subscription.status = 'active'; 
            subscription.startDate = startDate;
            subscription.endDate = endDate;
            subscription.price = price;
            subscription.billingCycle = billingCycle;
            subscription.transactionId = transactionId || subscription.transactionId; 
        } else {
            subscription = new Subscription({
                user: userId,
                plan,
                status: 'active',
                startDate,
                endDate,
                price,
                billingCycle,
                transactionId
            });
        }

        await subscription.save(); 

        res.status(201).json({ message: 'Subscription successfully recorded!', subscription });

    } catch (err) {
        console.error('Error recording subscription:', err.message);
        res.status(500).json({ message: 'Internal server error while recording subscription.' });
    }
});

router.get('/status', authenticateToken, async (req, res) => {
    try {
        const userId = req.userId; 
        
        const activeSubscription = await Subscription.findOne({
            user: userId,
            status: 'active', 
            endDate: { $gt: new Date() } 
        });

        if (activeSubscription) {
            res.json({ isSubscribed: true, plan: activeSubscription.plan, endDate: activeSubscription.endDate });
        } else {
            res.json({ isSubscribed: false, plan: null, endDate: null });
        }

    } catch (err) {
        console.error('Error checking subscription status:', err.message);
        res.status(500).json({ message: 'Internal server error while checking subscription status.' });
    }
});

module.exports = router;
