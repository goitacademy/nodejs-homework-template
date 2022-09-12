const sgMail = require("@sendgrid/mail");
const { SENDGRID_KEY } = process.env;
sgMail.setApiKey(SENDGRID_KEY);

const sendMail = async (data) => {
  const mail = { ...data, from: "dmytriishypilov@gmail.com" };

  try {
    await sgMail
      .send(mail)
      .then(() => {
        console.log("email sent");
      })
      .catch((error) => {
        console.log(error.message);
      });
    return true;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendMail;
