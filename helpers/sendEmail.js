const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
require('dotenv').config();

const { MAILGUN_API_KEY } = process.env;

const sendEmail = async data => {
    const mg = mailgun.client({
        username: "sergey.k7534@gmail.com",
    key: MAILGUN_API_KEY,
    });

    mg.messages.create("sandboxb26d54375e9945acb95c6124b9c80410.mailgun.org", {
        from: 'Mailgun Sandbox <sergey.k7534@gmail.com>',
         to: [data.to],
         subject: 'Verify your email',
         text: 'Verify your email',
         html: data.html,
    })
    .then(msg => console.log(msg))
    .catch(err => console.log(err));
};






module.exports = sendEmail;