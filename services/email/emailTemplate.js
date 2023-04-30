const { BASE_URL } = process.env;

const emailTemplate = (email, verificationToken) => {
  const a = {
    to: email,
    subject: "Verify Email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
  };
  return a;
};

module.exports = emailTemplate;
