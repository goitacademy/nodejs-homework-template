const { User } = require('../../models/user');

const { HttpError, ctrlWrapper } = require('../../helpers');

const register = async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    user: {
      email: newUser.email,
      password: newUser.password,
      subscription: newUser.subscription,
    },
  });
};

module.exports = { register: ctrlWrapper(register) };
