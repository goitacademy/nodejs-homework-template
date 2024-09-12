const nodemailer = require('nodemailer');
require('dotenv').config();

const { EMAIL_SENDER, EMAIL_PASSWORD } = process.env;

const mailerTransport = {
  service: "gmail",
  auth: {
    user: EMAIL_SENDER,
    pass: EMAIL_PASSWORD,
  },
};


const transporter = nodemailer.createTransport(mailerTransport);

const emailService = {
  sendMail(verificationToken, userEmail) {


    const mailDetails = {
      from: EMAIL_SENDER,
      to: userEmail,
      subject: "Authenticate your email",
      html:  `<a href="http://localhost:3000/verify/${verificationToken}">Verify Email</a> `,
    };
    
    transporter
      .sendMail(mailDetails)
      .then(() => console.log("Email send Success"))
      .catch((err) => console.error(err.message));
  },
};


module.exports = emailService;
