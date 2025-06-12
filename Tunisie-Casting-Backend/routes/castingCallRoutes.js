// routes/castingCallRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');       
const authorize = require('../middleware/roleMiddleware');  
const CastingCall = require('../models/castingCall');     

router.post('/', auth, authorize('directeur_casting'), async (req, res) => {
    const { title, description, location, deadline, compensation, roles } = req.body;

    try {
        const newCastingCall = new CastingCall({
            castingDirector: req.user.id, 
            title,
            description,
            location,
            deadline,
            compensation,
            roles
        });

        const castingCall = await newCastingCall.save(); 
        res.status(201).json(castingCall); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur lors de la création de l\'annonce.');
    }
});

router.get('/', async (req, res) => {
    try {
        const castingCalls = await CastingCall.find().populate('castingDirector', 'username email');
        res.json(castingCalls); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur lors de la récupération des annonces.');
    }
});


router.get('/:id', async (req, res) => {
    try {
        const castingCall = await CastingCall.findById(req.params.id).populate('castingDirector', 'username email');
        if (!castingCall) {
            return res.status(404).json({ msg: 'Annonce de casting non trouvée.' }); 
        }
        res.json(castingCall); 
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') { 
            return res.status(404).json({ msg: 'Annonce de casting non trouvée.' });
        }
        res.status(500).send('Erreur du serveur lors de la récupération de l\'annonce.');
    }
});

router.put('/:id', auth, authorize('directeur_casting'), async (req, res) => {
    const { title, description, location, deadline, compensation, roles, status } = req.body;

    try {
        let castingCall = await CastingCall.findById(req.params.id);
        if (!castingCall) {
            return res.status(404).json({ msg: 'Annonce de casting non trouvée.' });
        }

        if (castingCall.castingDirector.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Non autorisé. Vous n\'êtes pas le propriétaire de cette annonce.' });
        }

        Object.assign(castingCall, { title, description, location, deadline, compensation, roles, status });
        await castingCall.save(); 

        res.json(castingCall); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur.');
    }
});

router.delete('/:id', auth, authorize('directeur_casting'), async (req, res) => {
    try {
        let castingCall = await CastingCall.findById(req.params.id);
        if (!castingCall) {
            return res.status(404).json({ msg: 'Annonce de casting non trouvée.' });
        }

        if (castingCall.castingDirector.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Non autorisé. Vous n\'êtes pas le propriétaire de cette annonce.' });
        }

        await CastingCall.findByIdAndDelete(req.params.id); 
        res.json({ msg: 'Annonce de casting supprimée avec succès.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur.');
    }
});

module.exports = router;