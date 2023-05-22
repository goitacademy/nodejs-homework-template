const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, SENDGRID_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    const email = {
        ...data,
        from: SENDGRID_FROM,
    };
    await sgMail.send(email);
    return true;
};

module.exports = sendEmail;
