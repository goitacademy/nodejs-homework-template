// const nodemailer = require('nodemailer')
// const dotenv = require('dotenv')
// dotenv.config()

// const createTransport = () => {
//     const serverSMTP = 'smtp.ukr.net'
//     const portSMTP = 465
//     const sender = process.env.SENDER_UKR_NET
//     const password = process.env.PASSWORD_UKR_NET

//     return nodemailer.createTransport({
//         host: serverSMTP,
//         port: portSMTP,
//         secure: true,
//         auth: {
//             user: sender,
//             pass: password
//         },
//         debug: true
//     })
// }

// const sendEmail = async (transporter, optionsEmail) => {
//     return transporter.sendMail(optionsEmail)
// }

// module.exports = { createTransport, sendEmail }

const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()


const serverSMTP = 'smtp.ukr.net'
const portSMTP = 2525
const sender = process.env.SENDER_UKR_NET
const password = process.env.PASSWORD_UKR_NET

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

// const email = {
//     from: sender,
//     to: 'fodiha7991@jybra.com',
//     subject: 'Test email',
//     html: '<strong>Test email</strong>'
// }

const sendEmail = async (data) => {
    try {
        await transport.sendMail(data);
        console.log('Email sent successfully');
        return true;
    } catch (err) {
        console.error('Error sending email:', err);
        return false;
    }
}


module.exports = sendEmail