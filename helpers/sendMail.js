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

const sendMail = async data => {
    try {
        const email = { ...data, from: 'helnikitka@gmail.com' };

        const info = await transporter.sendMail(email);
        console.log('Email sent successfully:', info.response);
    } catch (error) {
        console.error('Error sending email:', error.message);
    }
};
module.exports = sendMail;
