// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        console.log("Authentification échouée : Aucun token fourni.");
        return res.status(401).json({ message: 'Accès refusé : Aucun token fourni.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Erreur de vérification du token JWT:', err.message);

            return res.status(403).json({ message: 'Accès refusé : Token invalide ou expiré.' });
        }

        req.userId = user.id; 

        req.user = user;     
        next(); 
    });
};

module.exports = authenticateToken;
