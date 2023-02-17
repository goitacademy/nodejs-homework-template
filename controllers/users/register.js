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

  const emailOptions = {
    to: email,
    subject: 'Verify your email',
    html: `<a target="_blank" 
    href="${BASE_URL}/api/users/verify/${verificationCode}">
    Click to verify your email</a>`,
  };

  await sendEmail(emailOptions);

  const existingUser = await register.findUser(email);
  if (existingUser) {
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
