const nodemailer = require("nodemailer");

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // 25, 465 (secured), 2525
  secure: true,
  auth: {
    user: "serhii96@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: "",
//   from: "serhii96@meta.ua",
//   subject: "Test email",
//   html: "<h2>Test email from localhost:3000</h2>",
// };

const sendEmail = async (emailData) => {
  const email = {
    ...emailData,
    from: "serhii96@meta.ua",
  };

  await transport
    .sendMail(email)
    .then(() => console.log("Email send succes"))
    .catch((error) => console.log(error.message));
};

module.exports = sendEmail;
