require('dotenv').config();
const nodemailer = require('nodemailer');

const  transport = nodemailer.createTransport({
   host: "sandbox.smtp.mailtrap.io",
   port: 2525,
   auth: {
     user: process.env.MAILTRAP_USER,
     pass: process.env.MAILTRAP_PASSWORD,
   }
 });

  const message = {
    to: "dema_dc@meta.ua",
    from: "dema_dc@meta.ua",
    subject: "From Admin with Love",
    html: "<h1>Merry Christmas</h1>",
    text: "Node.js is awesome platform", 
 }
 transport.sendMail(message )
   .then((response) => console.log(response))
   .catch((error) => console.log(error));



 


// require('dotenv').config();

// const sgMail = require('@sendgrid/mail');

//  sgMail.setApiKey(process.env.SENDGREED_API_KEY);

//  const message = {
//     to: "dema_dc@meta.ua",
//     from: "dema_dc@meta.ua",
//     subject: "From Admin with Love",
//     html: "<h1>Merry Christmas</h1>",
//     text: "Node.js is awesome platform", 
//  }
//  sgMail
//     .send(message)
//     .then((response)=> response)
//     .catch((error)=> error);