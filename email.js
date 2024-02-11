const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    to: 'michalszczepasnki07@gmial.com',
    from: 'michalszczepasnki07@gmial.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail
.send(msg)
.then(() => {
    console.log('Email sent');
})
.catch((error) => {
    console.error(error);
}