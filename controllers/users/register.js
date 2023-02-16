const {
  register,
  sendEmail,
} = require('../../services/users');
const { Conflict } = require('http-errors');
const { v4: uuid } = require('uuid');

const gravatar = require('gravatar');
module.exports = async (req, res) => {
  const { email } = req.body;
  const verificationCode = uuid();
  const { BASE_URL } = process.env;

  const verifyEmail = {
    to: email,
    subject: 'Test to verify some email',
    html: `<a target="_blank" 
    href="${BASE_URL}/api/users/verify/${verificationCode}">
    Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  const user = await register.findUser(email);
  if (user) {
    throw Conflict(
      `User with email: ${email} already exists`
    );
  }

  const avatarURL = await gravatar.url(email);
  const newUser = await register.createNewUser(
    req.body,
    avatarURL,
    verificationCode
  );

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};
