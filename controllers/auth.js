const User = require('../models/user');
const { HttpError, controllerWrapper } = require('../helpers');

const register = async (req, res) => {
  const newUser = await User.create(req.body);
  res.json({
    email: newUser.email,
  });
};

module.exports = {
  register: controllerWrapper(register),
};
