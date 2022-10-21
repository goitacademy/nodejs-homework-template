const nodemailer = require('nodemailer');

const { META_KEY } = process.env;

const nodemailerConfig = {
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
        user: 'gnaticoleg@meta.ua',
        pass: META_KEY,
    },
};

const sendEmail = nodemailer.createTransport(nodemailerConfig);

module.exports = sendEmail;
