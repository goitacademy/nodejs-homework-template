const nodemailer = require("nodemailer");

require("dotenv").config();

const { PASSWORD } = process.env;

const sendEmail = async (data) => {
  try {
    const nodemailerConfig = {
      host: "smtp.meta.ua",
      port: 465,
      secure: true,
      auth: {
        user: "tetianabond@meta.ua",
        pass: PASSWORD,
      },
    };
    const transporter = nodemailer.createTransport(nodemailerConfig);

    const email = await transporter.sendMail({
      ...data,
      from: "tetianabond@meta.ua",
    });
    return email;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendEmail;
