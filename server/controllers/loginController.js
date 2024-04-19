const { Customer, Saler } = require("../models");
const { checkPassword } = require("../services/passwordService");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;
        let user;

        switch (role) {
            case "Saler":
                user = await Saler.findOne({
                    where: { email: email },
                });
                break;
            case "Customer":
                user = await Customer.findOne({
                    where: { email: email },
                });
                break;
            default:
                console.log("_____role sai");
                return res.status(500).json({ error: "Login failed!" });
        }

        if (!user) return res.status(401).json({ message: 'Invalid login credentials.' });
        if (user.disabled) return res.status(401).json({ message: 'Your account has been disabled! Please contact Administrator for more info.' });

        if (!(await checkPassword(password, user.password))) {
            return res.status(401).json({ message: 'Invalid login credentials' });
        }

        const payload = {
            id: user.customerid || user.salerid,
            email: user.email,
            role: role,
        };
        const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '30m',
        });
        const refreshToken = jwt.sign({ ...payload, refreshToken: true }, process.env.SECRET_KEY, {
            expiresIn: '1d',
        });

        return res.status(200).json({
            ...payload,
            accessToken,
            refreshToken,
        });
    } catch (e) { next(e); }
};


module.exports = { login };