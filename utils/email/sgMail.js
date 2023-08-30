const asyncHandler = require("express-async-handler");
// const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
require("dotenv").config();
// const userModel = require("../../models/userModel");

const { SECRET_EMAIL } = process.env;
const HttpError = require("../../utils/errors/HttpError");

const sendVerificationToken = asyncHandler(async (req, res) => {
  const { mail, token } = req.body;

  if (!mail || !token) {
    throw new HttpError(404, res.message);
  }

  const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: "kcn.9i@meta.ua",
      pass: SECRET_EMAIL,
    },
  };

  const transporter = nodemailer.createTransport(nodemailerConfig);

  const msg = {
    to: mail,
    // to: "kcn.9i@meta.ua",
    from: "kcn.9i@meta.ua",
    subject: "Email verification",
    text: "Let's verify your email address",
    html: `<strong>By clicking on the following link, you are confirming your email address <a href=${`http://localhost:3000/api/v1/users/verify/${token}`}>VERIFY</a></strong>`,
  };

  transporter
    .sendMail(msg)
    .then(() => console.log("Email sent"))
    .catch((error) => {
      console.error(error);
    });
});

module.exports = { sendVerificationToken };




// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465,  
//   secure: true,
//   auth: {
//     user: "kcn.9i@meta.ua",
//     pass: SECRET_EMAIL,
//   },
// };

// const transporter = nodemailer.createTransport(nodemailerConfig);

// const msg = {
//   // to: mail,
//   to: "kcn.9i@meta.ua",
//   from: "kcn.9i@meta.ua",
//   subject: "Email verification",
//   text: "Let's verify your email address",
//   html: `<strong>By clicking on the following link, you are confirming your email address <a href=${`http://localhost:3000/api/v1/users/verify/${token}`}>VERIFY</a></strong>`,
// };

// transporter.sendMail(msg)
//   .then(() => console.log("Email sent"))
//   .catch(error => {
//     console.error(error);
//   });







// const transporter = nodemailer.createTransport({
//   host: "smtp.forwardemail.net",
//   port: 465,
//   secure: true,
//   auth: {
//     // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//     user: "kcn.9i@meta.ua",
//     pass: "M1e2t3a4",
//   },
// });


// const sendVerificationToken = asyncHandler(async (req, res) => {
//   // console.log(process.env.SENDGRID_API_KEY);
//   // const { mail, token } = req.body;

//   // if (!mail || !token) {
//   //   throw new HttpError(404, res.message);
//   // }

//   const transporter = nodemailer.createTransport({
//     host: "smtp.meta.ua",
//     port: 465,
//     secure: true,
//     auth: {
//       user: "kcn.9i@meta.ua",
//       pass: SECRET_EMAIL,
//     },
//   });

//   // verify connection configuration
//   await transporter.verify(function (error, success) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Server is ready to take our messages");
//     }
//   });





//   // await nodemailer
//   //   .send(transporter)
//   //   .then(() => {
//   //     console.log("Email sent");
//   //   })
//   //   .catch((error) => {
//   //     console.error(error);
//   //   });
// });








// // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// // const sendVerificationToken = asyncHandler(async (req, res) => {
// //   // console.log(process.env.SENDGRID_API_KEY);
// //   const { mail, token } = req.body;

// //   if (!mail || !token) {
// //     throw new HttpError(404, res.message);
// //   }
  
// //   const msg = {
// //     to: mail,
// //     from: "kcn.9i@meta.ua",
// //     subject: "Email verification",
// //     text: "Let's verify your email address",
// //     html: `<strong>By clicking on the following link, you are confirming your email address <a href=${`http://localhost:3000/api/users/verify/${token}`}>VERIFY</a></strong>`,
// //   };

// //   await sgMail
// //     .send(msg)
// //     .then(() => {
// //       console.log("Email sent");
// //     })
// //     .catch((error) => {
// //       console.error(error);
// //     });
// // });

// module.exports = { sendVerificationToken };
