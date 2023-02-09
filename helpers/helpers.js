const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function tryCatchWrapper(enpointFn) {
    return async (req, res, next) => {
      try {
        await enpointFn(req, res, next);
      } catch (error) {
        return next(error);
      }
    };
  }
  
  function HttpError(status, message) {
    const err = new Error(message);
    err.status = status;
    return err;
  }

  async function sendMail({ to, html, subject }) {
    const msg = {
      to,
      from: 'olya.trush@gmail.com', 
      subject,
      html,
    };
   
  
    await sgMail.send(msg);
  }

  
  module.exports = {
    tryCatchWrapper,
    HttpError,
    sendMail
    
  };
