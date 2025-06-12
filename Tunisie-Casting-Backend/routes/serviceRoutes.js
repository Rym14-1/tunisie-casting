// routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');
const Service = require('../models/service');
const multer = require('multer');
const { storage } = require('../config/cloudinary');

const upload = multer({ storage: storage });

// @route   POST /api/services
// @desc    Créer un nouveau service 
// @access  Private (Admin)
router.post('/', auth, authorize('admin'), upload.array('images', 5), async (req, res) => {
    const { name, description, price, duration, category, availability } = req.body;
    let images = [];
    if (req.files && req.files.length > 0) {
        images = req.files.map(file => file.path);
    }

    try {
        const newService = new Service({
            name,
            description,
            price,
            duration,
            category,
            images,
            availability: availability ? JSON.parse(availability) : [] 
        });

        const service = await newService.save();
        res.status(201).json(service);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur lors de la création du service.');
    }
});

// @route   GET /api/services
// @desc    Obtenir tous les services
// @access  Public
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur.');
    }
});

// @route   GET /api/services/:id
// @desc    Obtenir un service par ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ msg: 'Service non trouvé.' });
        }
        res.json(service);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Service non trouvé.' });
        }
        res.status(500).send('Erreur du serveur.');
    }
});

// @route   PUT /api/services/:id
// @desc    Mettre à jour un service (réservé aux admins)
// @access  Private (Admin)
router.put('/:id', auth, authorize('admin'), upload.array('images', 5), async (req, res) => {
    const { name, description, price, duration, category, availability } = req.body;
    const serviceFields = {};
    if (name) serviceFields.name = name;
    if (description) serviceFields.description = description;
    if (price) serviceFields.price = price;
    if (duration) serviceFields.duration = duration;
    if (category) serviceFields.category = category;
    if (availability) serviceFields.availability = JSON.parse(availability);

    if (req.files && req.files.length > 0) {
        serviceFields.images = req.files.map(file => file.path);
    }

    try {
        let service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ msg: 'Service non trouvé.' });
        }

        service = await Service.findByIdAndUpdate(
            req.params.id,
            { $set: serviceFields },
            { new: true }
        );
        res.json(service);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur.');
    }
});

// @route   DELETE /api/services/:id
// @desc    Supprimer un service (réservé aux admins)
// @access  Private (Admin)
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).json({ msg: 'Service non trouvé.' });
        }
        res.json({ msg: 'Service supprimé avec succès.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur.');
    }
});

module.exports = router;