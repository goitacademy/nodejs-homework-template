const sgMail = require('@sendgrid/mail');
 require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async (data) => {
    try {
        const email = {...data, from: "gortenzia1987@gmail.com"};
        await sgMail.send(email);
        return true;
    } catch (error) {
        return false;
    }

}





module.exports = sendEmail;