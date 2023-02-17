const {
  register,
  login,
  updateToken,
} = require('../../services/users');

const { Unauthorized } = require('http-errors');

module.exports = async (req, res) => {
  const { email, password } = req.body;

  const user = await register.findUser(email);
  if (!user) {
    throw Unauthorized(`Email: ${email} invalid`);
  }

  const isValidPassword = await login.isValidHash(
    password,
    user.password
  );
  if (!isValidPassword) {
    throw Unauthorized(`Password invalid`);
  }

  const token = await login.getToken(user._id);
  await updateToken(user._id, token);

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};
