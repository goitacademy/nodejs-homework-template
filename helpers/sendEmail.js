const nodemailer = require('nodemailer');
require('dotenv').config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  user: {
    user: 'anna.petrushko@meta.ua',
    pass: META_PASSWORD,
  },
};
const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: 'anna.petrushko@meta.ua' };

  await transport
    .sendMail(email)
    .then(() => console.log('Email send success'))
    .catch((err) => console.log(err.message));

  return true;
};

module.exports = sendEmail;

// const  ElasticEmail = require ('@elasticemail/elasticemail-client');
// require('dotenv').config();

// const {ELASTIC_API_KEY, EMAIL_FROM} = process.env;
 
// const defaultClient = ElasticEmail.ApiClient.instance;
 
// const {apikey} = defaultClient.authentications;
// apikey.apiKey = ELASTIC_API_KEY;
 
// const api = new ElasticEmail.EmailsApi();
 
// const sendEmail = () => {
//     // const { to, subject, html} = data;
//     const email = ElasticEmail.EmailMessageData.constructFromObject({
//         Recipients: [
//           new ElasticEmail.EmailRecipient("ditateg912@vasteron.com")
//         ],
//         Content: {
//           Body: [
//             ElasticEmail.BodyPart.constructFromObject({
//               ContentType: "HTML",
//               Content: "<strong>Test email</strong>"
//             })
//           ],
//           Subject: "Test email",
//           From: EMAIL_FROM,
//         },
//       });
       
//       const callback = function(error, data, response) {
//         if (error) {
//           console.error(error.message);
//         } else {
//           console.log('API called successfully.');
//         }
//       };
      
//       api.emailsPost(email, callback);
// }
// // const sgMail = require ("@sendgrid/mail");
// // require('dotenv').config();

// // const {SENDGRID_API_KEY} = process.env;

// // sgMail.setApiKey(SENDGRID_API_KEY);

// // const sendEmail = async (data) => {
// //     const email = {...data, from:'mag260910@gmail.com'};
// //     await sgMail.send(email);
// //     return true;
// // }
//  module.exports = sendEmail;