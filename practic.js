// PRACTIC----------------------------------------------------------------
// require("dotenv").config();
// const sgMail = require("@sendgrid/mail");
// const nodemailer = require("nodemailer");

// const { SENDGRID_API_KEY } = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

// const email = {
//   to: "volodyakushch@meta.ua",
//   from: "infernokgg@gmail.com",
//   subject: "Test Test Test",
//   html: "<h1>Hello from localhost:3000!</h1>",
// };
// sgMail
//   .send(email)
//   .then(() => console.log("Sent email"))
//   .catch((er) => console.log(er));

// Practic nodemailer----------------------------------------------------------------

// const { META_PASSWORD } = process.env;
// const nodmailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "volodyakushch@meta.ua",
//     pass: META_PASSWORD,
//   },
// };
// const transport = nodemailer.createTransport(nodmailerConfig);

// const email = {
//   to: "volodyakushch@meta.ua",
//   from: "volodyakushch@meta.ua",
//   subject: "Test Test Test",
//   html: "<h1>Hello from localhost:3000!</h1>",
// };
// transport
//   .sendMail(email)
//   .then(() => console.log("good work"))
//   .catch((err) => console.log(err));
// Practic----------------------------------------------------------------
