const verifyEmail = (email, url, verificationToken) => {
  return {
    to: email,
    subject: "Verify email",
    html: `<a target:"_blank" href="${url}/users/verify/${verificationToken}">Click verify email</a>`,
  };
};

module.exports = verifyEmail;
