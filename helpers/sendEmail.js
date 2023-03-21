const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const fromEmail = 'm95352813@gmail.com';

const sendEmail = async (data) => {
  const email = { ...data, from: fromEmail };

  try {
        await sgMail.send({ ...data, from: email });
        console.log('Email sent', { ...data, from: email });

        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = sendEmail;