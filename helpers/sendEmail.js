const { config } = require("dotenv");
const { createTransport } = require("nodemailer");
config();

const { UKR_NET_PASSWORD, UKR_NET_EMAIL } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = createTransport(nodemailerConfig);

const email = {
  from: UKR_NET_EMAIL,
  to: "oleg.kozub54@gmail.com",
  subject: "Test email",
  html: "<div>Test email</div>",
};

transport.sendMail(email);
