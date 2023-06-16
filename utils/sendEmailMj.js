const Mailjet = require("node-mailjet");

require("dotenv").config();

const { MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE, MJ_SENDER_EMAIL } = process.env;

const mailjet = new Mailjet({
  apiKey: MJ_APIKEY_PUBLIC,
  apiSecret: MJ_APIKEY_PRIVATE,
});

const sendEmailMailjet = async (data) => {
  await mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: MJ_SENDER_EMAIL,
        },
        To: [
          {
            Email: data.to,
          },
        ],
        Subject: data.subject,
        HTMLPart: data.html,
      },
    ],
  });
};

module.exports = {
  sendEmailMailjet,
};
