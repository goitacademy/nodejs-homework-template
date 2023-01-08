const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const email = process.env.SENDGRID_EMAIL;

const sendEmail = async (data) => {
    try {
        await sgMail.send({ ...data, from: email });
        console.log("Емейл отправлен", { ...data, from: email });

        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = sendEmail;
