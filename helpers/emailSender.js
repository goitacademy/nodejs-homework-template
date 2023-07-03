const { MAILGUN_DOMAIN, MAILGUN_API_KEY } = process.env;

const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: "Ihor Karen", key: MAILGUN_API_KEY });

function emailSender({ email, authKey }) {
  mg.messages
    .create(MAILGUN_DOMAIN, {
      from: "Ihor Karen <mailgun@sandbox-123.mailgun.org>",
      to: email,
      subject: "Verefication",
      html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${authKey}">Click to confirm your email</a>`,
    })
    .then((msg) => console.log(msg))
    .catch((err) => console.log(err));
}

module.exports = emailSender;
