const nodemailer = require('nodemailer');
require('dotenv').config();

const { GMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'helnikitka@gmail.com',
        pass: GMAIL_PASSWORD,
    },
});

const sendMail = async () => {
    try {
        const email = {
            to: 'helennikitchenko@meta.ua',
            from: 'helnikitka@gmail.com',
            subject: 'Test email',
            html: '<p><strong>Test email</strong> from localhost:3000</p>',
        };

        await transporter.sendMail(email);
        console.log('Email sent successfully');
    } catch (error) {
        console.log(error.message);
    }
};
module.exports = sendMail;
