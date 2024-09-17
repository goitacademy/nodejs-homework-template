const sgMail = require("@sendgrid/mail")
require("dotenv").config()

const {SANDGRID_API_KEY} = process.env

sgMail.setApiKey(SANDGRID_API_KEY)

const sendEmail = async (data) => {
    const email = {...data, from: "nikovsyannik@gmail.com"}
    await sgMail.send(email)
    return true
}

module.exports = sendEmail