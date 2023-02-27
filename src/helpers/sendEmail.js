// SendGrid service
// const sgMail = require('@sendgrid/mail');
// require('dotenv').config();

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendEmail = async (data) => {
//     const email = { ...data, from: 'antifishka.zp@gmail.com' };
        
//     await sgMail.send(email);
// };  

// module.exports = sendEmail;

// Nodemailer service
const nodemailer = require('nodemailer');
require('dotenv').config();

const { META_PASSWORD } = process.env;

const sendEmail = async (data) => {
    const nodemailerConfig = {
        host: "smtp.meta.ua",
        port: 465, // 25, 465 и 2255
        secure: true,
        auth: {
            user: "antifishka.zp@meta.ua",
            pass: META_PASSWORD
        }
    }
    console.log("nodemailerConfig", nodemailerConfig);

    const transporter = nodemailer.createTransport(nodemailerConfig);

    const email = { ...data, from: 'antifishka.zp@meta.ua' };
    console.log("email", email);

    try {
        await transporter.sendMail(email);
        console.log("Email send success");
    } catch (error) {
        console.log(error.message)
    }
};  

module.exports = sendEmail;



