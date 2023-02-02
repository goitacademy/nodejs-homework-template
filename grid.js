// const sgMail = require("@sendgrid/mail");
// const nodemailer = require("nodemailer");
// require("dotenv").config();
// SENDGRID_API_KEY,
// const { METTA_PASSWORD } = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

// const email = {
//   to: "vikaripka@gmail.com",
//   from: "contacts_app@meta.ua",
//   subject: "Contacts App",
//   html: "<h1>Verify email</h1><p>Please, do something</p>",
// };

// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "contacts_app@meta.ua",
//     pass: METTA_PASSWORD,
//   },
// };

// const transport = nodemailer.createTransport(nodemailerConfig);

// transport
//   .sendMail(email)
//   .then(() => console.log("Email send successful"))
//   .catch((err) => console.log(err.message));

// sgMail
//   .send(email)
//   .then(() => console.log("Email send successful"))
//   .catch((err) => console.log(err.message));

// const msg = {
//   to: 'test@example.com', // Change to your recipient
//   from: 'test@example.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
