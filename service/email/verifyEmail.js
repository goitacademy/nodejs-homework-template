const verifyEmail = (verificationToken) => {
  const { BASE_URL } = process.env;
  return {
    to: email,
    subject: "Verify email",
    html: `<div><a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a><a target="_blank" href="localhost:5000//api/auth/verify/${verificationToken}">"http://${BASE_URL}/api/auth/verify/${verificationToken}"</a></div>`,
  };
};

module.exports = verifyEmail;
