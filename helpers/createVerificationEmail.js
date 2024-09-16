const { BASE_URL } = process.env;

const verificationEmail = (email, verificationCode) => {
  const verifyLink = `${BASE_URL}/users/verify/${verificationCode}`;
  const verifyEmail = {
    to: email,
    subject: "Verificaton email",
    html: `<a target="_blank" href="${verifyLink}">Click to verify email</a>`,
  };

  return verifyEmail;
};

module.exports = verificationEmail;