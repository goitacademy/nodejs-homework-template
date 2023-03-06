// SendGrid service
// const sgMail = require('@sendgrid/mail');
// require('dotenv').config();

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendEmail = async (data) => {
//     const email = { ...data, from: 'antifishka.zp@gmail.com' };
        
//     await sgMail.send(email);
// };  

// module.exports = sendEmail;

// Nodemailer with mailtrap.io service
const nodemailer = require('nodemailer');
require('dotenv').config();

const { EMAIL_USER, EMAIL_PASS } = process.env;

const sendEmail = async (data) => {
    const nodemailerConfig = {
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        }
    }

    const transporter = nodemailer.createTransport(nodemailerConfig);

    const email = { ...data, from: "antifishka.zp@gmail.com" };

    try {
        await transporter.sendMail(email);
        console.log("Email send success");
    } catch (error) {
        console.log(error.message)
    }
};  

module.exports = {
    sendEmail,
}



