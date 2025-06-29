// routes/formationRoutes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware'); 
const User = require('../models/User'); 
const Formation = require('../models/Formation'); 


router.get('/', async (req, res) => {
    try {
        const formations = await Formation.find(); 
        res.json(formations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});


router.post('/', authenticateToken, async (req, res) => {
    const { title, description, duration, price, startDate, endDate, location } = req.body;
    try {
        const newFormation = new Formation({
            title, description, duration, price, startDate, endDate, location,

        });
        const formation = await newFormation.save();
        res.status(201).json(formation);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

module.exports = router;
