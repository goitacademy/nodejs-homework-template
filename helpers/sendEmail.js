// const nodemailer = require('nodemailer');
// const dotenv = require('dotenv');
// dotenv.config();

// const createTransport = () => {
//     const serverSMTP = 'smtp.ukr.net';
//     const portSMTP = 465;
//     const sender = process.env.SENDER_UKR_NET;
//     const password = process.env.PASSWORD_UKR_NET;

//     return nodemailer.createTransport({
//         host: serverSMTP,
//         port: portSMTP,
//         secure: true,
//         auth: {
//             user: sender,
//             pass: password
//         },
//         debug: true
//     });
// }

// const sendEmail = async (transporter, optionsEmail) => {
//     return transporter.sendMail(optionsEmail);
// }

// module.exports = { createTransport, sendEmail };

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();


const serverSMTP = 'smtp.ukr.net';
const portSMTP = 2525;
const sender = process.env.SENDER_UKR_NET;
const password = process.env.PASSWORD_UKR_NET;

const nodemailerConfig = {
    host: serverSMTP,
    port: portSMTP,
    secure: true,
    auth: {
        user: sender,
        pass: password
    },
    debug: true
}

const transport = nodemailer.createTransport(nodemailerConfig)

const sendEmail = async (data) => {
    const email = { ...data, from: serverSMTP }
    await transport.sendMail(email)
    return true
}

module.exports = sendEmail;