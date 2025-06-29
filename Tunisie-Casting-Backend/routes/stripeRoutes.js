// routes/stripeRoutes.js

const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 
const authenticateToken = require('../middlewares/authMiddleware'); 
const User = require('../models/User'); 
const Subscription = require('../models/Subscription'); 


router.post('/stripe/create-checkout-session', authenticateToken, async (req, res) => {
    const { plan, billingCycle, price } = req.body;
    const userId = req.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        const customerEmail = user.email;
        const amountInCents = Math.round(price * 100); // Convertit le prix en centimes

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'tnd', // Devise : Dinar Tunisien
                        product_data: {
                            name: `Abonnement ${plan} (${billingCycle})`,
                            description: `Accès au plan ${plan} de Tunisie Casting`,
                        },
                        unit_amount: amountInCents,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment', // Paiement unique
            success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/subscription?payment_cancelled=true`,
            customer_email: customerEmail,
            metadata: { // Métadonnées pour le webhook
                userId: userId.toString(),
                plan: plan,
                billingCycle: billingCycle,
            },
        });

        res.json({ id: session.id }); // Renvoie l'ID de session au frontend
    } catch (error) {
        console.error('Erreur session Checkout Stripe:', error);
        res.status(500).json({ message: 'Erreur création session paiement.', error: error.message });
    }
});

/**
 * Gère les événements webhook de Stripe (ex: paiement réussi)
 * ATTENTION: En production, valider la signature du webhook !
 */
router.post('/stripe/webhook', express.raw({type: 'application/json'}), async (req, res) => {
    const payload = req.body;
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        // En prod, utiliser: event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);
        event = payload; // Pour le développement

        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                console.log('Stripe Checkout Session Completed:', session.id);

                const { userId, plan, billingCycle } = session.metadata;
                const transactionId = session.id;
                const paymentStatus = session.payment_status === 'paid' ? 'active' : 'pending';
                const amountPaid = session.amount_total / 100;

                let endDate = new Date(); // Calcule la date de fin
                if (billingCycle === 'monthly') {
                    endDate.setMonth(endDate.getMonth() + 1);
                } else if (billingCycle === 'annually') {
                    endDate.setFullYear(endDate.getFullYear() + 1);
                } else {
                    endDate.setMonth(endDate.getMonth() + 1);
                }

                // Met à jour ou crée l'abonnement dans la DB
                await Subscription.findOneAndUpdate(
                    { user: userId }, 
                    {
                        user: userId,
                        plan: plan,
                        status: paymentStatus,
                        startDate: new Date(),
                        endDate: endDate,
                        price: amountPaid,
                        billingCycle: billingCycle,
                        transactionId: transactionId,
                        updatedAt: new Date()
                    },
                    { 
                        upsert: true, // Crée si non trouvé
                        new: true,    // Retourne le document mis à jour/créé
                        setDefaultsOnInsert: true // Applique les valeurs par défaut à l'insertion
                    }
                );
                console.log(`Abonnement ${plan} pour l'utilisateur ${userId} mis à jour/créé.`);
                break;
            default:
                console.log(`Type d'événement Stripe non géré : ${event.type}`);
        }

        res.status(200).json({ received: true }); // Confirme la réception à Stripe
    } catch (err) {
        console.error('Erreur gestion webhook Stripe:', err.message);
        res.status(400).send(`Erreur Webhook: ${err.message}`);
    }
});

module.exports = router;
