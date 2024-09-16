const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendgrigMail = async (data) => {
  try {
    const msg = {
    ...data,
    from: 'kpaxx@ukr.net'
};
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body)
    }
  }
};

module.exports = {sendgrigMail}