const nodemailer = require('nodemailer')
require('dotenv').config()

const { EMAIL_PASSWORD } = process.env

const config = {
    host: 'mail.meta.ua',
    port: 465,
    secure: true,
    auth: {
        user: 'viktoriia.khimich@meta.ua',
        pass: EMAIL_PASSWORD
    }
}

const transporter = nodemailer.createTransport(config)

const sendVerificationEmail = ({ email, verifyToken }) => {
    const msg = {
        from: 'viktoriia.khimich@meta.ua',
        to: email,
        subject: 'Please verify your account',
        html: `Welcome to our web-site! To verify your account please go by <a href="http://localhost:3000/api/v1/users/verify/${verifyToken}></a>`,
    }
    transporter
        .sendMail(msg)
        .then(info => console.log(info))
        .catch(error => console.log(error))
}

module.exports = sendVerificationEmail
