const RequestError = require('../../helpers/requestError');
const { register } = require('../../services/users');

module.exports = async (req, res) => {
  const { email } = req.body;

  const user = await register.findUser(email);
  if (user) {
    throw RequestError(
      409,
      `User with email: ${email} already exists`
    );
  }

  const newUser = await register.createNewUser(req.body);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};
