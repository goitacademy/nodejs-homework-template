const sgMail = require('@sendgrid/mail');

const sendEmail = (email, message) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: 'stanislav.hryhoriev@gmail.com', // Change to your verified sender
    subject: 'Please verify your email',
    text: `${message}`,
    html: `<strong>${message}</strong>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendEmail;
