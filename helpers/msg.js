const msg = (email, verificationToken) => {
  return {
    to: email,
    subject: "Thank you for registration, verify email",
    html: `<h1>Hello, your verification token is ${verificationToken}.</h1> <p>Please push on button VERIFY EMAIL to have  access to your account</p>
    <button> <a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">VERIFY EMAIL</a></button>`,
  };
};

module.exports = msg;
