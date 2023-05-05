const nodemailer = require('nodemailer');

require('dotenv').config();

const {META_PASSWORD} = process.env;

const sendEmail = (data) => {
    const config = {
        host: 'smtp.meta.ua',
        port: 465,
        secure: true,
        auth: {
            user: "novittana@meta.ua",
            pass: META_PASSWORD,
        },
    };

    const transporter = nodemailer.createTransport(config);

    const email = {...data, from: "novittana@meta.ua"
    };

    transporter.sendMail(email);
    return true;
}

module.exports = sendEmail;