echo "export SENDGRID_API_KEY='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'" > sendgrid.env
echo "sendgrid.env" >> .gitignore
source./ sendgrid.env

API_KEY = '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'

npm install--save @sendgrid/mail

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
javascript
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'test@example.com', // Change to your recipient
  from: 'test@example.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })