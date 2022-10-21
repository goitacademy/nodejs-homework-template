const nodemailer = require('nodemailer');

const { UKR_KEY, USER_UKR_NET } = process.env;

const nodemailerConfig = {
    host: 'smtp.ukr.net',
    port: 2525,
    secure: true,
    auth: {
        user: USER_UKR_NET,
        pass: UKR_KEY,
    },
};

const sendEmail = nodemailer.createTransport(nodemailerConfig);

module.exports = sendEmail;
