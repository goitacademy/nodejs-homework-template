// const nodemailer = require("nodemailer");
const postmark = require("postmark");

const sendEmail = async (email, token, type) => {
  console.log(email, token);
  const { BASE_URL, EMAIL_API } = process.env;
  const EMAIL_FROM = "pokhylko_sa@use.ua";
  const client = new postmark.ServerClient(EMAIL_API);

  //   const nodemailerConfig = {
  //     host: "mail.twiga.com.ua",
  //     port: 10025,
  //     secure: false,
  //     requireTLS: true,
  //     auth: {
  //       user: EMAIL_FROM,
  //       pass: EMAIL_PASSWORD,
  //     },
  //     tls: {
  //       minVersion: "TLSv1",
  //       rejectUnauthorized: false,
  //     },
  //   };

  const msg = {
    From: EMAIL_FROM,
    To: email,
    Subject: "Verify your email",
    HtmlBody: `<a target="_blank" href=${BASE_URL}/api/auth/verify/${token}>Click to verify email</a>`,
  };

  //   const transport = nodemailer.createTransport(nodemailerConfig);
  await client.sendEmail(msg);
  return true;
};

module.exports = sendEmail;
