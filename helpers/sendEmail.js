const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API } = process.env;
sgMail.setApiKey(SENDGRID_API);

// const email = {
//     to: "gofac20557@meogl.com",
//     from: "arquatev@gmail.com",
//     subject: "Test email",
//     html: "<p>Test email</p>"
// }

// sgMail.send(email)
//     .then(() => console.log('success sent'))
//     .catch(err => console.log(err))


const sendEmail = async (data) => {
    const email = { ...data, from: "arquatev@gmail.com" }
    await sgMail.send(email);
    return true;
};

module.exports = sendEmail;