const sgEmail = require('@sendgrid/mail');

const {SENDGRID_API_KEY, EMAIL_FROM} = process.env;

sgEmail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = {...data, from: `${EMAIL_FROM}`};

  try {
    await sgEmail.send(email);
    // .then(()=> console.log('Email send succes'));
    return true;
  } catch (error) {
    return error;
  }
};

module.exports = sendEmail;
