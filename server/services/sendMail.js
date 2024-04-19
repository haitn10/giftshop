require('dotenv').config();
const nodemailer = require('nodemailer');

const sendMail = async ({
    receivers, subject, html, ccEmail,
}) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_TO_EMAIL,
            pass: process.env.MAIL_PASSWORD,
        }
    });

    try {
        const info = await transporter.sendMail({
            from: process.env.MAIL_TO_EMAIL,
            to: receivers,
            subject: subject,
            html: html,
            cc: ccEmail,
        });
        return Promise.resolve("Email sent:", info.messageId);

    } catch (e) {
        return Promise.reject("Send mail failed!", e);
    }
};


module.exports = { sendMail };