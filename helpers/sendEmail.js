// const nodemailer = require('nodemailer');
// require('dotenv').config();
const sendgrid = require('@sendgrid/mail');

const { META_USER, META_PASSWORD, SENDGRID_API_KEY, SENDGRID_FROM } = process.env;

// const config = {
//     host: 'smtp.meta.ua',    
//     port: 465, //25, 2525, 587
//     secure: true,
//     auth: {
//         user: META_USER,
//         pass: META_PASSWORD
//     }
// }

// const transporter = nodemailer.createTransport(config);

// const email = {
//     from: META_USER,
//     to: META_USER,
//     subject: 'Nodemailer test',
//     html:'<p>My first mail</p>'
// }

// const sendEmail = async (data) => {
//     const mail = {...data, from: META_USER}
//     await transporter.sendMail(mail)
//         .then(() => console.log('Email sent success'))
//         .catch((error) => console.log(error))
//     return true;
// }

sendgrid.setApiKey(SENDGRID_API_KEY);

const email = {
    from: SENDGRID_FROM,
    to: META_USER,
    subject: 'Sendgrid test',
    html:'<p>My first mail</p>'
}

const sendEmail = async (data, from = SENDGRID_FROM) => {
    
    try{
        const email = { ...data, from };
        // console.log('SENDGRID DATA ', data);
        
        await sendgrid.send( email );
        
        return true;
    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports = sendEmail;