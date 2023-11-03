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