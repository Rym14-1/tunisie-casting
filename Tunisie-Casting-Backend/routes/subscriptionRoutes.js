// routes/subscriptionRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');
const User = require('../models/user'); r

const subscriptionPlans = {
    basic: { price: 30, annualPrice: 300, duration: 30, description: 'Accès aux fiches de talents.' },
    pro: { price: 60, annualPrice: 600, duration: 30, description: 'Accès aux fiches de talents + professionnels techniques.' },
    premium: { price: 90, annualPrice: 960, duration: 30, description: 'Accès complet + avantages exclusifs.' }
};

// @route   GET /api/subscriptions/plans
// @desc    Obtenir la liste des plans d'abonnement
// @access  Public
router.get('/plans', (req, res) => {
    res.json(subscriptionPlans);
});

// @route   POST /api/subscriptions/subscribe
// @desc    Abonner un utilisateur à un plan
// @access  Private (utilisateur connecté)
router.post('/subscribe', auth, async (req, res) => {
    const { plan, paymentMethod, isAnnual } = req.body; // 

    if (!plan || !subscriptionPlans[plan]) {
        return res.status(400).json({ msg: 'Plan d\'abonnement invalide.' });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'Utilisateur non trouvé.' });
        }

        const selectedPlan = subscriptionPlans[plan];
        let endDate = new Date();
        let priceToCharge = isAnnual ? selectedPlan.annualPrice : selectedPlan.price;
        let durationInDays = isAnnual ? 365 : 30; // 

        endDate.setDate(endDate.getDate() + durationInDays);

        user.subscription = {
            plan: plan,
            startDate: new Date(),
            endDate: endDate,
            isActive: true
        };

        await user.save();
        res.json({ msg: `Abonnement au plan '${plan}' activé avec succès pour ${durationInDays} jours.`, user: user.subscription });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur lors de l\'abonnement.');
    }
});

// @route   GET /api/subscriptions/status
// @desc    Obtenir le statut d'abonnement de l'utilisateur connecté
// @access  Private
router.get('/status', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('subscription');
        if (!user) {
            return res.status(404).json({ msg: 'Utilisateur non trouvé.' });
        }
        res.json(user.subscription);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur.');
    }
});

module.exports = router;