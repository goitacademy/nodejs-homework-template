const formData = require("form-data");
const Mailgun = require("mailgun.js");
const { nanoid } = require("nanoid");
const mailgun = new Mailgun(formData);
const mailgunApiKey = process.env.MAILGUN_APIKEY;
require("dotenv").config();
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_APIKEY || `${mailgunApiKey}`,
});
function generateVerificationToken() {
  return nanoid();
}

async function sendVerificationEmail() {
  const fromAddress = "michal74158@wp.pl";
  await mg.messages
    .create("sandbox-123.mailgun.org", {
      from: `Exciter User ${fromAddress}`,
      to: ["faceitszpn@gmail.com"],
      subject: "Hello",
      text: "Testing some Mailgun awesomeness!",
      html: "<h1>Testing some Mailgun awesomeness!</h1>",
    })
    .then((msg) => console.log(msg))
    .catch((err) => console.log(err));
}
module.exports = { generateVerificationToken, sendVerificationEmail };
