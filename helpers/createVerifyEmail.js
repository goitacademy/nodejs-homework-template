const { BASE_URL } = process.env;

const createVerifyEmail = (email,verificationToken) => {
  const mail = {
    to: email,
    subject: "Підтвердження реєстрації на сайті",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Натиснути для підтверження</a>`
  };
  return mail;
}

module.exports = createVerifyEmail;