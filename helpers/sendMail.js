const nodemailer = require("nodemailer");

const { META_PASSWORD } = process.env;

async function sendMail({ to, subject, html }) {
  try {
    const nodemailerConfig = {
      host: "smtp.meta.ua",
      port: 465,
      secure: true,
      auth: {
        user: "nodetestmail@meta.ua",
        pass: META_PASSWORD,
      },
    };

    const transporter = nodemailer.createTransport(nodemailerConfig);

    const email = {
      from: "nodetestmail@meta.ua",
      to,
      subject,
      html,
    };

    await transporter.sendMail(email);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { sendMail };
