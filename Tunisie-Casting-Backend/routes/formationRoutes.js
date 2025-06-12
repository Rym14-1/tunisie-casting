// routes/formationRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');
const Formation = require('../models/formation');
const User = require('../models/user'); 

// @route   POST /api/formations
// @desc    
// @access  
router.post('/', auth, authorize('admin'), async (req, res) => {
    const { title, description, instructor, price, duration, startDate, endDate, category, maxParticipants } = req.body;

    try {
        const newFormation = new Formation({
            title,
            description,
            instructor,
            price,
            duration,
            startDate,
            endDate,
            category,
            maxParticipants
        });

        const formation = await newFormation.save();
        res.status(201).json(formation);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur lors de la création de la formation.');
    }
});

// @route   GET /api/formations
// @desc    
// @access  
router.get('/', async (req, res) => {
    try {
        const formations = await Formation.find();
        res.json(formations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur.');
    }
});

// @route   GET /api/formations/:id
// @desc    Obtenir une formation par ID
// @access  
router.get('/:id', async (req, res) => {
    try {
        const formation = await Formation.findById(req.params.id);
        if (!formation) {
            return res.status(404).json({ msg: 'Formation non trouvée.' });
        }
        res.json(formation);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Formation non trouvée.' });
        }
        res.status(500).send('Erreur du serveur.');
    }
});

// @route   POST /api/formations/:id/register
// @desc    Inscrire un utilisateur à une formation
// @access  
router.post('/:id/register', auth, async (req, res) => {
    try {
        const formation = await Formation.findById(req.params.id);
        if (!formation) {
            return res.status(404).json({ msg: 'Formation non trouvée.' });
        }

        if (formation.currentParticipants >= formation.maxParticipants) {
            return res.status(400).json({ msg: 'La formation est complète.' });
        }

       
        formation.currentParticipants += 1;
        await formation.save();

        res.json({ msg: 'Inscription à la formation réussie.', formation });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur lors de l\'inscription à la formation.');
    }
});

// @route   POST /api/formations/:id/testimonials
// @desc    Ajouter un témoignage à une formation
// @access  Private 
router.post('/:id/testimonials', auth, async (req, res) => {
    const { rating, comment } = req.body;

    try {
        const formation = await Formation.findById(req.params.id);
        if (!formation) {
            return res.status(404).json({ msg: 'Formation non trouvée.' });
        }


        
        const newTestimonial = {
            user: req.user.id,
            rating,
            comment
        };

        formation.testimonials.unshift(newTestimonial); 
        await formation.save();

        res.json({ msg: 'Témoignage ajouté avec succès.', testimonials: formation.testimonials });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur lors de l\'ajout du témoignage.');
    }
});


module.exports = router;