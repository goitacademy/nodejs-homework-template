const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

const createTransport = () => {
    const serverSMTP = process.env.SERVER_METAUA_SMTP
    const portSMTP = process.env.PORT_METAUA_SMTP
    const sender = process.env.SENDER_METAUA
    const password = process.env.PASSWORD_METAUA

    return nodemailer.createTransport({
        host: serverSMTP,
        port: portSMTP,
        secure: true,
        auth: {
            user: sender,
            pass: password
        }
    })
}


const sendEmail = async (transporter, optionsEmail) => {
    return transporter.sendMail(optionsEmail)
}

module.exports = { createTransport, sendEmail }




/**
 * nmr - nodemailer
 */