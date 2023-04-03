const sgMail = require('@sendgrid/mail');
// require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async (data)=> {
 const email = {...data,from:"gortenzia1987@gmail.com"};

 try {
     await sgMail.send(email);
     return true;
 } catch (error) {
     throw error;
 }

}





module.exports = sendEmail;