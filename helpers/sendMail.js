const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  try {
    const mail = { ...data, from: "persatyi@ukr.net" };
    await sgMail.send(mail);
    return true;
  } catch (error) {
    throw error.message;
  }
};

module.exports = sendMail;

// const mail = {
//   to: "persatyi@gmail.com",
//   from: "persatyi@ukr.net",
//   subject: "Новое увидомление",
//   html: "<p>На сайте новое увидомление!</p>",
// };

// sgMail
//   .send(mail)
//   .then(() => console.log("Mail send success"))
//   .catch((error) => console.log(error.message));
