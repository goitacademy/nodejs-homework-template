const nodemailer = require('nodemailer');
require('dotenv').config();

const { META_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
        user: 'helennikitchenko@meta.ua',
        pass: META_PASSWORD,
    },
});

const sendMail = async () => {
    try {
        const email = {
            to: 'xovoni6693@rc3s.com',
            from: 'helennikitchenko@meta.ua',
            subject: 'Test email',
            html: '<p><strong>Test email</strong> from localhost:3000</p>',
        };

        await transporter.sendMail(email);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendMail;
