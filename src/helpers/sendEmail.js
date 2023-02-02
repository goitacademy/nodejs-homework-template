import sgMail from '@sendgrid/mail'; // to send email
import * as dotenv from 'dotenv'; // to get variables from .env
dotenv.config();

const { SENDGRID_API_KEY, BASE_URL } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const getMessage = ({ type, email, verificationToken }) => {
  let dynamic_template_data = {};

  switch (type) {
    case 'verification':
      dynamic_template_data.href = `${BASE_URL}/api/users/verify/${verificationToken}`;
      return {
        to: email,
        from: 'v.voronova.1117@gmail.com',
        templateId: 'd-d49a8fe3c1ab40fca7731b281812d7a9',
        dynamic_template_data,
      };

    case 'registration':
      dynamic_template_data.email = email;
      return {
        to: email,
        from: 'v.voronova.1117@gmail.com',
        templateId: 'd-0d4ec29672394956aff19f0b22280c26',
        dynamic_template_data,
      };

    default:
      break;
  }
};

export const sendEmail = async ({ type, email, verificationToken }) => {
  const message = getMessage({ type, email, verificationToken });
  await sgMail.send(message);
};
