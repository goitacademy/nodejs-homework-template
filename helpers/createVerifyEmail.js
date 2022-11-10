require("dotenv").config();
const { BASE_URL } = process.env;

const createVerifyEmail = async (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
  };
  return mail;
};

module.exports = createVerifyEmail;
