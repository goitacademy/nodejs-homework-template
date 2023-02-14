const { register } = require('../../services/users');
const { Conflict } = require('http-errors');

const gravatar = require('gravatar');

module.exports = async (req, res) => {
  const { email } = req.body;

  const user = await register.findUser(email);
  if (user) {
    throw Conflict(
      `User with email: ${email} already exists`
    );
  }

  const avatarURL = await gravatar.url(email);
  const newUser = await register.createNewUser(
    req.body,
    avatarURL
  );

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};
