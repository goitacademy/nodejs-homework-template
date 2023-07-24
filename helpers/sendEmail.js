const nodemailer = require('nodemailer');

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
        user: 'netmarket@meta.ua',
        pass: META_PASSWORD,
    },
};

const transport = nodemailer.createTransport(nodemailerConfig);

async function sendEmail(data) {
    const email = { ...data, from: 'netmarket@meta.ua' };
    await transport.sendMail(email);
    return true;
}

module.exports = sendEmail;
