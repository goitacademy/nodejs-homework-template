const createVerifyEmail = (to, verificationToken) => {
  const msg = {
    to,
    from: "alex.sediakin@gmail.com",
    subject: "Verify your email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Please click this link to verify your email</a>`,
  };
  return msg;
};

module.exports = createVerifyEmail;
