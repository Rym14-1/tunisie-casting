// middleware/roleMiddleware.js
module.exports = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(401).json({ msg: 'Non autorisé. Rôle non défini.' });
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ msg: 'Accès refusé. Vous n\'avez pas le bon rôle.' });
        }
        next(); 
    };
};