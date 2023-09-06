 const nodemailer = require("nodemailer");
 require("dotenv").config();

const {UKRNET_PASSWORD} = process.env;

       const config = {
        host: "smtp.ukr.net",
        port: 465,
         secure: true,
           auth: {
           user: "usovajulia23@ukr.net",
           pass: UKRNET_PASSWORD,
     },
    };
     const transporter = nodemailer.createTransport(config);

   
     const sendEmail = async (data) => {
          const email = {
         to: "xiyono4691@docwl.com",
         from: "usovajulia23@ukr.net",
         subject: "Click here",
         html: "<p>Click here</p>"
     };
 await transporter.sendMail(email);
  return true;
 };

  module.exports = sendEmail;

