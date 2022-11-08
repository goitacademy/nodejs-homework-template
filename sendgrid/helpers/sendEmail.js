require("dotenv").config();
const sgMail = require('@sendgrid/mail');

const { SG_KEY } = process.env;

sgMail.setApiKey(SG_KEY);

const sendEmail = async (data) => {
    const email = { ...data, from: "petr.mazka@gmail.com" };
    try {
        await sgMail.send(email);
        return true;
    } catch (error) {
        throw error;
    }
};
  
module.exports = sendEmail;