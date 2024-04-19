const jwt = require('jsonwebtoken');
const { Saler } = require('../models')

module.exports = role => async (req, res, next) => {
    const authorizationHeader = req.headers["authorization"];
    const accessToken = authorizationHeader.split(" ")[1];

    try {
        const payload = jwt.verify(accessToken, process.env.SECRET_KEY);
        if (payload.id) {
            const saler = await Saler.findOne({ where: { salerid: payload.id } });
            if (saler.disabled) return res.status(403).json({ message: 'Your account has been disabled! Please contact Administrator for more info.' });
        }

        if (payload.role) {
            if (!role) {
                req.info = payload;
                return next();
            }
            
            if (role === 'Saler' && payload.role === role) {
                req.info = payload;
                return next();
            }

            if (flatten([role, 'Saler']).includes(payload.role)) {
                req.info = payload;
                return next();
            }
        }
        return res.status(401).json({
            message: 'You are Not authorized!',
        });
    } catch (e) {
        return res.status(401).json({
            message: 'You are Not authorized.',
        });
    }
};