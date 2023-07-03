const nodemailer = require("nodemailer");
require("dotenv").config();

const {EMAIL, PASSWORD} = process.env;

const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465, 
    secure: true,
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
}

const transport = nodemailer.createTransport(nodemailerConfig);


const sendEmail = async(data) => {
    const email = {...data, from: EMAIL};
    await transport.sendMail(email);
    return true;
}

module.exports = sendEmail;