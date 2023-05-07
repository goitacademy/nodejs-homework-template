const nodemailer = require("nodemailer");
require("dotenv").config();

const {META_PASSWORD, EMAIL_FROM} = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465, // 25, 465, 2525
    secure: true,
    auth: {
        user: EMAIL_FROM,
        pass: META_PASSWORD,
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

/*
const data = {
    to: "mahera1071@syinxun.com",
    subject: "Test email",
    html: `<p>Test email</p>`
};
*/

const sendEmail = async(data)=> {
    const email = {...data, from: EMAIL_FROM,};
    await transport.sendMail(email);
    return true;
}

module.exports = sendEmail;