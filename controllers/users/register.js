const { register } = require('../../services/users');
const httpError = require('http-errors');

const gravatar = require('gravatar');

module.exports = async (req, res) => {
  const { email } = req.body;

  const user = await register.findUser(email);
  if (user) {
    throw httpError(
      409,
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
