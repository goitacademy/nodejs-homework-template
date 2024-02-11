const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");

dotenv.config();

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async data =>{
    const email = {...data, from: "sosikanna5@gmail.com"};
    await sgMail.send(email);
    return true;
};

module.exports = sendEmail;