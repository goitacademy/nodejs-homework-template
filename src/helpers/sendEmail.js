import sgMail from '@sendgrid/mail'; // to send email
import * as dotenv from 'dotenv'; // to get variables from .env
dotenv.config();

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);
console.log('SENDGRID_API_KEY', SENDGRID_API_KEY);

const getMessage = ({ type, email, verificationToken }) => {
  switch (type) {
    case 'verification':
      return {
        to: email,
        from: 'v.voronova.1117@gmail.com',
        subject: 'Email verification',
        text: `Please, confirm your email: http://localhost:3000/api/users//verify/${verificationToken}`,
        html: `Please, <a href="http://localhost:3000/api/users/verify/${verificationToken}">confirm</a> your email `,
      };

    case 'registration':
      return {
        to: email,
        from: 'v.voronova.1117@gmail.com',
        subject: 'Thank you for registration',
        text: "You've been successfully registered",
        html: "<h1>You've been successfully registered</h1>",
      };

    default:
      break;
  }
};

export const sendEmail = async ({ type, email, verificationToken }) => {
  const message = getMessage({ type, email, verificationToken });
  await sgMail.send(message);
};
