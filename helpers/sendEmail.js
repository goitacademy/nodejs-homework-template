const postmark = require("postmark");

const sendEmail = async ({ email, token }) => {
  const { BASE_URL, EMAIL_API } = process.env;
  const EMAIL_FROM = "sender@snowboards.com.ua";
  const client = new postmark.ServerClient(EMAIL_API);
   const msg = {
     From: EMAIL_FROM,
     To: email,
     Subject: "Verify your email",
     HtmlBody: `<a target="_blank" href=${BASE_URL}/api/auth/verify/${token}>Click to verify email</a>`,
   };

  await client.sendEmail(msg);
  return true;
};

module.exports = sendEmail;
