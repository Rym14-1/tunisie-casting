// server.js

require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); 
const { Server } = require('socket.io'); 
const jwt = require('jsonwebtoken'); 


const authRoutes = require('./routes/authRoutes'); 
const userRoutes = require('./routes/userRoute');
const castingCallRoutes = require('./routes/castingCallRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const formationRoutes = require('./routes/formationRoutes');
const profileRoutes = require('./routes/profileRoutes');


const messageRoutes = require('./routes/messageRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const talentRoutes = require('./routes/talentRoutes'); 
const professionalRoutes = require('./routes/professionalRoutes'); 
const stripeRoutes = require('./routes/stripeRoutes'); 


const cloudinaryConfig = require('./config/cloudinary'); 


const app = express();
const server = http.createServer(app); 


const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true
    }
});


const PORT = process.env.PORT || 5000;



app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true 
}));

app.use((req, res, next) => {
    if (req.originalUrl === '/api/stripe/webhook') {
        next(); 
    } else {
        express.json()(req, res, next); 
    }
});

app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB!'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/casting-calls', castingCallRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/formations', formationRoutes);
app.use('/api', profileRoutes);
app.use('/api', messageRoutes(io));
app.use('/api', notificationRoutes(io));
app.use('/api/talents', talentRoutes);
app.use('/api/professionals', professionalRoutes);
app.use('/api', stripeRoutes); 


app.get('/', (req, res) => {
    res.send('Welcome to the Tunisie Casting backend!');
});


app.use((err, req, res, next) => {
    console.error('SERVER ERROR:', err.stack);
    if (res.headersSent) {
        return next(err);
    }
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'Oups ! Une erreur interne est survenue sur le serveur.',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
});


io.on('connection', (socket) => {
    const token = socket.handshake.query.token; 

    if (!token) {
        console.log('Connexion Socket.IO refusée : Token manquant.');
        socket.disconnect();
        return;
    }


    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Connexion Socket.IO refusée : Token invalide ou expiré.', err.message);
            socket.disconnect();
            return;
        }


        socket.userId = user.id; 
        console.log(`Utilisateur ${socket.userId} connecté via Socket.IO. Socket ID: ${socket.id}`);


        socket.join(`user-${socket.userId}`);


        socket.on('joinConversation', (conversationId) => {

            Object.keys(socket.rooms).forEach(room => {
                if (room.startsWith('conversation-') && room !== `conversation-${conversationId}`) {
                    socket.leave(room);
                    console.log(`Socket ${socket.id} (Utilisateur ${socket.userId}) a quitté la room: ${room}`);
                }
            });

            socket.join(`conversation-${conversationId}`);
            console.log(`Socket ${socket.id} (Utilisateur ${socket.userId}) a rejoint la conversation room: ${conversationId}`);
        });


        socket.on('disconnect', () => {
            console.log(`Utilisateur ${socket.userId} déconnecté de Socket.IO. Socket ID: ${socket.id}`);
        });


        socket.on('error', (err) => {
            console.error(`Erreur Socket.IO pour le socket ${socket.id}:`, err);
        });
    });
});


server.listen(PORT, () => {
    console.log(`🚀 Serveur en marche sur le port ${PORT}`);
    console.log(`Frontend URL autorisé: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});
