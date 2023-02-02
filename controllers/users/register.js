const { register } = require('../../services/users');
const httpError = require('http-errors');

module.exports = async (req, res) => {
  const { email } = req.body;

  const user = await register.findUser(email);
  if (user) {
    throw httpError(
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
