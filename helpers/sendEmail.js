import sgMail from "@sendgrid/mail";
import "dotenv/config";

const { SENDGRID_API_KEY, SENDGRID_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = (data) => {
  const email = { ...data, from: SENDGRID_FROM };
  sgMail
    .send(email)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

export default sendEmail;
