const nodemailer = require("nodemailer");

require("dotenv").config();
const sendEmailToVerify = async ({ email, verificationToken }) => {
  const config = {
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
      user: process.env.SEND_GRID_USERNAME,
      pass: process.env.SEND_GRID_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);

  const emailOptions = {
    from: "monika.nowakowska01@gmail.com",
    to: "monika.nowakowska01@gmail.com",
    subject: "Please verify your email",
    html: `<b>Let's verify your email: <h1>${email}</h1></b><a style="box-sizing: border-box; border-color: #348eda; font-weight: 380; text-decoration: none; display: inline-block; margin: 0; color: #ffffff; background-color: #348eda; border: solid 1px #348eda; border-radius: 2px; cursor: pointer; font-size: 14px; padding: 12px 45px;" href="${process.env.SEND_GRID_BASE_URL}/users/verify/${verificationToken}" target="_blank">Verify Your email</a>`,
  };

  await transporter
    .sendMail(emailOptions)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
};

module.exports = sendEmailToVerify;
