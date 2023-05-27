const sendGrid = require("@sendgrid/mail");
const { SEND_GRID_KEY } = process.env;

async function sendMail({ to, subject, html }) {
  try {
    sendGrid.setApiKey(SEND_GRID_KEY);
    const from = "andryukhamelnyk@gmail.com";

    const email = {
      from,
      to,
      subject,
      text: "and easy to do anywhere, even with Node.js",
      html,
    };

    const res = await sendGrid.send(email);
    console.log("res :", res);
  } catch (err) {
    console.log("App err", err);
  }
}
module.exports = sendMail;
