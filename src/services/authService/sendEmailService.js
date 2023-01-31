require("dotenv").config();
const nodemailer = require("nodemailer");

// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmailService = async (email, token) => {
  const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: "oleksandr482@meta.ua",
      pass: process.env.PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: "oleksandr482@meta.ua",
    to: email,
    subject: "Email verification",
    text: `Hello! You have registered for a very cool service. To verify your email, follow the link /users/verify/${token} . If you have not registered, please delete this message.`,
  };

  await transporter.sendMail(emailOptions);

  // SendGrid
  //   const msg = {
  //     to: email,
  //     from: "sanyok482@gmail.com",
  //     subject: "Email verification",
  //     text: `Hello! You have registered for a very cool service. To verify your email, follow the link /users/verify/${token} . If you have not registered, please delete this message.`,
  //     html: `<p>Hello! You have registered for a very cool service. To verify your email, follow the <a href='/verify/${token}'>link</a> . If you have not registered, please delete this message.</p>`,
  //   };
  //   await sgMail.send(msg);
};

module.exports = { sendEmailService };
