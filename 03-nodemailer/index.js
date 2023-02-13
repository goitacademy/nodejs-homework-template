require("dotenv").config();
const nodemailer = require("nodemailer")

const {EMAIL_PASS, EMAIL_USER } = process.env;

async function main() {
try {
    const email ={
    from: "maximdm22@gmail.com",
    to: "maximdm22@gmail.com",
    subject: "Sengrid Test",
    html: "<h1> Hello there!! </h1>",
    text: "Hello there!!",

}

const  transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS,
        }
      });

const response = await transport.sendMail(email);
console.log(response);

}catch (error) {
    console.error("app error", error);
}
}
main()



