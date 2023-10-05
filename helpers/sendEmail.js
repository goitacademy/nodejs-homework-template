// const sgMail = require('@sendgrid/mail');
// require('dotenv').config();

// const { SENDGRID_API_KEY } = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

// const sendEmail = async (data) => {
//     await sgMail.send({...data, from: 'o.yemelianov@yahoo.com' })
// };

// module.exports = sendEmail;

const nodemailer = require('nodemailer');
require('dotenv').config();
const { PASSWORD_META } = process.env;

const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
        user: 'yemelianov_o_hw@meta.ua',
        pass: PASSWORD_META
    }
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async (data) => {
    await transporter.sendMail({...data, from: 'yemelianov_o_hw@meta.ua' })
};

module.exports = sendEmail;