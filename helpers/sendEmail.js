const nodemailer = require("nodemailer");
require("dotenv").config();

const {UKRNET_PASSWORD} = process.env;

const config = {
    host: "smtp.ukr.net",
    port: "456",
    secure: true,
    auth: {
        user: "usovajulia23@ukr.net",
        password: UKRNET_PASSWORD,
},
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async (data) => {
    const email = {...data, from: "usovajulia23@ukr.net"};
    await transporter.sendEmail(email);
    return true;
};

module.exports = sendEmail;