const nodemailer = require('nodemailer');

const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const config = {
    host: 'smtp.ukr.net',
    port: 465,
    secure: true,
    auth: {
        user: UKR_NET_EMAIL,
        pass: UKR_NET_PASSWORD,
    },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async data => {
    const email = { ...data, from: UKR_NET_EMAIL };
    return transporter.sendMail(email);
};

module.exports = sendEmail;
