const {
  register,
  login,
  updateToken,
} = require('../../services/users');

const RequestError = require('../../helpers/requestError');

module.exports = async (req, res) => {
  const { email, password } = req.body;

  const user = await register.findUser(email);
  if (!user) {
    throw RequestError(401, `Email: ${email} invalid`);
  }

  const isValidPassword = await login.isValidHash(
    password,
    user.password
  );

  if (!isValidPassword) {
    throw RequestError(401, `Password invalid`);
  }

  const token = await login.getToken(user.id);
  await updateToken(user.id, token);

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};
