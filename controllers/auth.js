const bcrypt = require('bcrypt');

const { UserModel } = require('../models');

const { HttpError, ctrlWrapper } = require('../utils');

const register = async (req, res) => {
  const { password, email } = req.body;
  const user = await UserModel.findOne({ email });

  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const hachedPassword = await bcrypt.hash(password, 10);
  const newUser = await UserModel.create({ ...req.body, password: hachedPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
