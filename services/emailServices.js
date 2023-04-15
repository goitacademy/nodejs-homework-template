const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });
const sgMail = require("@sendgrid/mail");

const { SENDGRID_FROM, SENDGRID_APIKEY } = process.env;

sgMail.setApiKey(SENDGRID_APIKEY);

const sendVerifyEmail = async (data) => {
    try {
        const letter = { ...data, from: SENDGRID_FROM };
        await sgMail.send(letter);
        console.log('Email send success');
        return true;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

module.exports = sendVerifyEmail;