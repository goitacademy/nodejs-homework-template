const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: "465", // 25 465 -захищений порт 2525
    secure: true,
    auth: {
        user: "kozlov.oleksandr89@meta.ua",
        pass: META_PASSWORD,
    }
}
const transport = nodemailer.createTransport(nodemailerConfig);
const sendEmail = async (data) => {
  const email = { ...data, from: "kozlov.oleksandr89@meta.ua" };
 
  await transport.sendMail( email);
  return true;
};
// mg.messages
//   .create("sandbox-123.mailgun.org", {
//     to: "kolova.alina93@gmail.com",
//     from: "kozlov.oleksandr89@meta.ua",
//     subject: "Hello",
//     text: "Testing some Mailgun awesomeness!",
//     html: "<h1>Testing some Mailgun awesomeness!</h1>",
//   })
//   .then((msg) => console.log(`${msg}. EMAIL SENT!:)`)) // logs response data
//   .catch((err) => console.log(err)); // logs any error

module.exports = sendEmail;
