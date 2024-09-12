const sgMail = require('@sendgrid/mail');

const { SENGRID_API_KEY } = process.env;
sgMail.setApiKey(SENGRID_API_KEY);

const sendEmail = async (data, next) => {
  const email = { ...data, from: 'yuriy.orekhov@gmail.com' };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    next(error);
  }
};

module.exports = sendEmail;
