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

const email = {
    from: UKR_NET_EMAIL,
    to: 'natif44891@vasteron.com',
    subject: 'Test email',
    html: '<strong>Test email</strong> from Nodemailer!',
};

transporter
    .sendMail(email)
    .then(() => console.log('Email send success'))
    .catch(error => console.log(error.message));
