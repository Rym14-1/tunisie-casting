// routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const Service = require('../models/Service'); 
const User = require('../models/User'); 


router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});


router.post('/', authenticateToken, async (req, res) => {
    const { name, description, price, category } = req.body;
    try {
        const newService = new Service({
            name, description, price, category,
            provider: req.userId 
        });
        const service = await newService.save();
        res.status(201).json(service);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

module.exports = router;
