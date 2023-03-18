const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

// const email = {
//   to: 'rerej10536@asoflex.com',
//   from: 'tvinlee7@gmail.com',
//   subject: 'test mail',
//   html: '<p><strong>Test mail</strong>from me</p>',
// };
// sgMail
//   .send(email)
//   .then(() => {
//     console.log('sucsess!');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

const sendEmail = async (data) => {
  const email = { ...data, from: 'tvinlee7@meta.ua' };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
