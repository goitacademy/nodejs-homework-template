const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, SENDGRID_SENDER } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const mail = { ...data, from: `${SENDGRID_SENDER}` };
  await sgMail.send(mail);
  return true;
};
//const sendEmail = async (data) => {
//  const email = { ...data, from: `${SENDGRID_SENDER}` };
// try {
//   const result = await sgMail.send(email);
//   console.log("result", result);
// } catch (error) {
//   console.log("error", error);
//  throw error;
// }
//};
module.exports = sendEmail;