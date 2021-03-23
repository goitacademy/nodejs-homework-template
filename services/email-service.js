const Mailgen = require("mailgen");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

class EmailService {
  #sender = sgMail;
  #GenerateTemplate = Mailgen;
  constructor(env) {}
  #createTemplate(verifyToken, name = "Guest") {}
  sendEmail(verifyToken, name, email) {}
}

module.exports = EmailService;
