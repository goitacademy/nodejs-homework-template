const nodemailer = require('nodemailer');

require('dotenv').config();

const config = {
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
};

const transporter = nodemailer.createTransport(config);

const emailOptions = {
    from: process.env.EMAIL,
    to: process.env.TEST_EMAIL,
    subject: 'Nodemailer test',
    text: 'Привіт. Ми тестуємо надсилання листів!',
};

transporter.sendMail(emailOptions)
    .then(info => console.log("Success"))
    .catch(err => console.log(err.message));