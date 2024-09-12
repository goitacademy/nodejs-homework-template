// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const { META_PASSWORD } = process.env;

// // class Email {
// //   constructor(user, url) {
// //     this.to = user.email;
// //     this.name = user.name;
// //     this.url = url;
// //     this.from = process.env.EMAIL_FROM;
// //   }



// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "boltnode@meta.ua",
//     pass: META_PASSWORD,
//   },
// };

// const transporter = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: "test@mail.ua",
//   from: "boltnode@meta.ua",
//   subject: "Test mail success!",
//   html: "<p>Test mail localhost</p>",
// };



// await transporter
//   .sendMail(email)
//   .then(() => console.log("End send success"))
//   .catch((error) => console.log(error.message));

// const sendEmail = async (data) => {
//   const email = { ...data, from: "admin@mail.ua" };
//   await sgMail.send(email);
//   return true;
// };



// module.exports = sendMail;
