import sgMail from "@sendgrid/mail";
import "dotenv/config";


const { SENDGRID_API_KEY, SENDGRID_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = data => {
    const msg = { ...data, from: SENDGRID_EMAIL };
    return sgMail.send(msg);
};

export default sendMail;