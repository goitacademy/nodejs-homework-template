const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: " Confirmation of registration on the site",
    html: `<a target="_blank" href="${BASE_URL}/api/user/verify/${verificationToken}">Click to confirm</a>`,
  };

  return mail;
};

module.exports = createVerifyEmail;
