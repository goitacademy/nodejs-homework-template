const nodemailer = require('nodemailer');



require('dotenv').config();

const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'andryidreact@meta.ua',
    pass: process.env.PASSWORD,
  },
};

const SendEmail = async (email,verificationToken,BASE_URL) => {
    
const transporter = nodemailer.createTransport(config);
 const   emailOptions =  {
  from: 'andryidreact@meta.ua',
  to: `${email}`,
  subject: 'Nodemailer test',
  html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verifi email</a>`,
};

transporter
  .sendMail(emailOptions)
  .then(info => console.log(info))
 .catch(err => console.log(err));
    
}

module.exports = SendEmail;