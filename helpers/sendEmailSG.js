import "dotenv/config";
import sgMail from "@sendgrid/mail";

const { EMAIL_FROM: SENDGRID_EMAIL_FROM, SENDGRID_API_KEY } = process.env;
// console.log("SENDGRID_API_KEY :>> ", SENDGRID_API_KEY);
// sgMail.setApiKey(SENDGRID_API_KEY);

// const msg = {
//   to: "test@example.com",
//   from: EMAIL_FROM,
//   subject: "Sending with Twilio SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };

export const sendEmailSG = async (data) => {
  // const email = { ...data, from: SENDGRID_EMAIL_FROM };
  // await sgMail
  //   .send(email)
  //   .than(() => console.log("Email send success !"))
  //   .catch((err) => console.log(err.message));
  return true;
};
