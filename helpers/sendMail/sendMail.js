const sgMail = require("@sendgrid/mail");
const { PORT, SENDGRID_FROM_EMAIL, SENDGRID_TO_EMAIL, SENDGRID_API_KEY } =
  process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sgMailData = (verificationToken) => {
  const data = {
    to: SENDGRID_TO_EMAIL,
    from: SENDGRID_FROM_EMAIL,
    subject: "Подтверждение регистрации на сайте",
    html: `<a target="_blank" href="http://localhost:${PORT}/api/auth//users/verify/${verificationToken}">Нажмите для подтверждения email</a>`,
  };
  return data;
};

const sendMail = async (sgMailData, next) => {
  try {
    const mail = { ...sgMailData };
    await sgMail.send(mail);
  } catch (error) {
    next(error);
  }
};

module.exports = { sgMailData, sendMail };
