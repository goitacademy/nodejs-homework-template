const nodemailer = require("nodemailer");
// ==================================================================
const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});
// =============================================================
// const transport = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   auth: {
//     user: "process.env.SMTP_USER",
//     password: "process.env.SMTP_PASSWORD",
//   },
// });
// ======================================================================
// const transporter = nodemailer.createTransport({
//   service: "gmail", // or your own SMTP
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   providerauth: { user: "usanka1980@gmail.com" }, // user -> important
//   password: "sashalisiu1980", // pass -> important (do not use password)
// });
// =========================================================================
// const massage = {
//   from: process.env.SMTP_USER,
//   to: "pokataevalexandr07@gmail.com",
//   subject: process.env.API_URL,
//   text: "email tobi v pomosh",
//   html: "<h1 style='color: #ff0000;'>email tobi v pomosh</h1>",
// };

const sendActivetionMail = async (massage) => {
  await transport.sendMail(massage).then(console.log).catch(console.error);
};

module.exports = sendActivetionMail;
