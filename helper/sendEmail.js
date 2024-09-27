const sgMail = require('@sendgrid/mail');

const {GRID_API_KEY} = process.env;

sgMail.setApiKey(GRID_API_KEY);

const sendEmail = async (data) => {
const email = {...data, from: "bakalavrat.789@gmail.com" };
await sgMail.send(email);
return true;
};

// const email = {
//   to: "tilosif630@kameili.com",
//   from: "bakalavrat.789@gmail.com",
//   subject: "Test email",
//   html: "<p><strong>Test email</strong> from localhost:3000</p>",
// };

// sgMail.send(email)
// .then(()=>console.log('Email send surcess'))
// .catch(error => console.log(error.message))

module.exports = sendEmail;