const nodemailer = require("nodemailer")
require("dotenv").config()

const { META_PASSWORD} = process.env

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    // host: "smtp.meta.ua",
    // port: 465,
    // secure: true,
    auth: {
        user: "9ea9020ecbf39b",
        pass: "0876acedbfb72c",
        // user: "deniszaviriukha@meta.ua",
        // pass: META_PASSWORD,
    }
})

// const transport = nodemailer.createTransport(nodemailerConfig)

// const email = {
//     to: "dv.zavirukha@gmail.com",
//     from: "deniszaviriukha@meta.ua",
//     subject: "Test email",
//     html: "<p>test message"
// }

// transport.sendMail(email)
//     .then(() => console.log('success'))
//     .catch(error => console.log(error))

const sendEmail = message => {
    message.from = "dv.zavirukha@gmail.com"
    return transport.sendMail(message)
}

module.exports = sendEmail