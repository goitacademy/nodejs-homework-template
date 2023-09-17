const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.meta.ua',
    port: '465',
    secure: true,
    auth: {
        user: 'tanux@meta.ua',
        pass: process.env.META_PASS
    }
});

const sendMail = async (data) => {
    const message = { ...data, from: 'tanux@meta.ua' };

    transporter.sendMail(message);
    return true;

}
module.exports = sendMail;