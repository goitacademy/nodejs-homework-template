// add sandgrid
const sendGrid = require('@sendgrid/mail');
const { SENDGRID_API_TEST_KEY } = process.env;

// add nodemailer
const nodemailer = require('nodemailer');
const { USER_NODEMAILER, PASS_NODEMAILER } = process.env;

function tryCatchWrapper(enpointFn) {
  return async (req, res, next) => {
    try {
      await enpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

// add sandgrid
async function sendMailSandgrid({ to, subject, html }) {
  sendGrid.setApiKey(SENDGRID_API_TEST_KEY);
  // example:
  // const email = {
  //   from: 'v.mashyka@gmail.com',
  //   to: 'v.mashyka@gmail.com',
  //   subject: 'Sendgrid greeting',
  //   html: '<h1>Hello, Viktor is here!</h1>',
  //   text: 'Hello, Viktor is here!',
  // };
  const email = {
    from: 'v.mashyka@gmail.com',
    to,
    subject,
    html,
  };
  const response = await sendGrid.send(email);
  console.log('response sendGrid: ', response);
}

// add nodemailer
async function sendMailNodemailer({ to, subject, html }) {
  // example:
  // const email = {
  //   from: 'v.mashyka@gmail.com',
  //   to: 'v.mashyka@gmail.com',
  //   subject: 'Nodemailer greeting',
  //   html: '<h1>Hello, Viktor is here!</h1>',
  //   text: 'Hello, Viktor is here!',
  // };

  const email = {
    from: 'v.mashyka@gmail.com',
    to,
    subject,
    html,
  };
  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: USER_NODEMAILER,
      pass: PASS_NODEMAILER,
    },
  });
  const response = await transport.sendMail(email);
  console.log('response nodemailer: ', response);
}

//**Example 1 */
// class HttpError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = "HttpError";
//   }
// }

//**Example 2 */
// function HttpError(status, message) {
//   const err = new Error(message);
//   err.status = status;
//   return err;
// }
//** *//

module.exports = {
  tryCatchWrapper,
  sendMailNodemailer,
  sendMailSandgrid,
};
