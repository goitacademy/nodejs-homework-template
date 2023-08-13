const { BASE_URL } = process.env;
const createVerifyEmail = (email, verificationCode) => {
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: ` <a href="${BASE_URL}/api/auth/verify/${verificationCode}" target="_blank">Click verify email</a>`,
  };
  return verifyEmail;
};

export default createVerifyEmail;
