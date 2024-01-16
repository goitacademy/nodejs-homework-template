const sgMail = require('@sendgrid/mail');
const { convert } = require('html-to-text');
const { emailServiceConfig } = require('../configs');

sgMail.setApiKey(emailServiceConfig.SENDGRID_API_KEY);

exports.verify = (to, url) => {
    const html = `<div style="text-align: center;">
        <h1>Verify your email</h1>
        <p>Click <a href="${url}" target="_blank">here</a> for verify yor email</p>
    </div>`;
    
    return sgMail.send({
        to,
        html,
        subject: 'Verification email',
        from: emailServiceConfig.EMAIL_FROM,
        text: convert(html),
    });}