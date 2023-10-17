const { User } = require("../models/user");

const { HttpError, ctrlWrapper } = require("../helpers");

const register = async (reg, res) => {
  const newUser = await User.create(reg.body);

  res.json({
    email: newUser.email,
    password: newUser.password,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
