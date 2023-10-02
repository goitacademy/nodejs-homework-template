// const { BASE_URL } = process.env;

const verifyEmail = (email, verificationToken) => {
  return {
    to: email,
    subject: `Verify email`,
    html: `<p>To confirm your registration, please click on link below</p>
        <p>
          <a target="_blank" href="${process.env.BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>
        </p>`,
    text: `To confirm your registration, please click on link below\n
    ${process.env.BASE_URL}/api/users/verify/${verificationToken}
     `,
  };
};

module.exports = verifyEmail;
