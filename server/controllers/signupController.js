const crypto = require('crypto');
const { pick } = require('lodash')
const { v4: uuidv4 } = require("uuid");

const { Customer, Saler } = require('../models');
const { hashPassword } = require('../services/passwordService');
const { sendMail } = require('../services/sendMail');

const signup = async (req, res, next) => {
    try {
        const { role, email, name } = req.body;


        // Kiểm tra dữ liệu đầu vào
        if (!role || (role !== 'Customer' && role !== 'Saler') || !email || !name) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        // Tạo mật khẩu ngẫu nhiên 
        const rawPassword = crypto.randomBytes(10).toString('hex');
        const password = await hashPassword(rawPassword);
        const uid = uuidv4();

        let user;
        switch (role) {
            case "Customer":
                const existingCustomer = await Customer.findOne({
                    where: { email: email },
                });

                if (existingCustomer) {
                    return res.status(500).json({ errorMessage: "Email already exists!" });
                } else {
                    user = await Customer.create({
                        customerid: uid,
                        name: name,
                        email: email,
                        password,
                    });
                }
                break;
            case "Saler":
                const existingSaler = await Saler.findOne({
                    where: { email: email },
                });

                if (existingSaler) {
                    return res.status(500).json({ errorMessage: "Email already exists!" });
                } else {
                    user = await Saler.create({
                        salerid: uid,
                        name: name,
                        email: email,
                        password,
                    });
                }
                break;
            default:
                console.log("_____role sai");
                return res.status(500).json({ errorMessage: "Registration failed!" });
        }

        // Gửi email chứa mật khẩu ngẫu nhiên tới người dùng
        await sendMail({
            receivers: [email],
            subject: 'Welcome to Gift Shop Page',
            html: `Your password is:<b> ${rawPassword}</b>`,
        });

        // Trả về thông tin người dùng
        return res.status(200).json(
            pick(user, ['name', 'email', 'role']),
        );

    } catch (e) {
        console.error(e);
        return res.status(500).json({ errorMessage: e.message || e });
    }
}

module.exports = { signup };