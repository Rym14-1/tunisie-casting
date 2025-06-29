//routes/castingCallRoutes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const CastingCall = require('../models/CastingCall'); 
const User = require('../models/User'); 


router.get('/', async (req, res) => {
    try {
        const castingCalls = await CastingCall.find();
        res.json(castingCalls);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});


router.post('/', authenticateToken, async (req, res) => {
    const { title, description, projectType, roles, applicationDeadline, location, contactEmail } = req.body;
    try {
        const newCastingCall = new CastingCall({
            title, description, projectType, roles, applicationDeadline, location, contactEmail,
            creator: req.userId 
        });
        const castingCall = await newCastingCall.save();
        res.status(201).json(castingCall);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

module.exports = router;
