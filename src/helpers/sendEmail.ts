import nodemailer from "nodemailer";
import "dotenv/config";

const { GMAIL_SENT_FROM, GMAIL_PASSWORD } = process.env;

const config = {
  host: "smtp.gmail.com", //*Адреса поштового сервера
  port: 587,
  auth: {
    user: GMAIL_SENT_FROM,
    pass: GMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(config);

const sendEmail = (data: any) => {
  const email = { ...data, from: GMAIL_SENT_FROM };
  return transport.sendMail(email);
};

export default sendEmail;

//! Надсилання пошти через ElasticEmail

// import ElasticEmail from "@elasticemail/elasticemail-client";
// import "dotenv/config";

// const { ELASTIC_EMAIL_API_KEY, ELASTIC_EMAIL_SEND_FROM } = process.env;

// const defaultClient = ElasticEmail.ApiClient.instance;

// const { apikey } = defaultClient.authentications;

// const api = new ElasticEmail.EmailsApi();

// apikey.api = ELASTIC_EMAIL_API_KEY;

// const email = ElasticEmail.EmailMessageData.constructFromObject({
//   Recipients: [new ElasticEmail.EmailRecipient("canila1953@lanxi8.com")], //*Список emails куди будемо відправляти листи
//   Content: {
//     Body: [
//       ElasticEmail.BodyPart.constructFromObject({
//         ContentType: "HTML",
//         Content: "<h1>My test email content ;)</h1>",
//       }),
//     ],
//     Subject: "testing email",
//     From: ELASTIC_EMAIL_SEND_FROM,
//   },
// });

// const callback = (error, data, response) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log("API called successfully.");
//   }
// };

// api.emailsPost(email, callback);
