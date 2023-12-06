
const nodemailer = require('nodemailer');

const  transport = nodemailer.createTransport({
   host: "sandbox.smtp.mailtrap.io",
   port: 2525,
   auth: {
     user: process.env.MAILTRAP_USER,
     pass: process.env.MAILTRAP_PASSWORD,
   }
 });

 function sendEmail(message){
  message.from = "dema_dc@meta.ua";
  
  return  transport.sendMail(message)

 }

 module.exports = sendEmail;

 