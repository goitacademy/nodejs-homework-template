const { ctrlWrapper } = require("../decorators");
const User = require("../models/user");

const register = async (req, res) => {
  const createdUser = await User.create(req.body);
  res.status(201).json(createdUser);
};

module.exports = {
  register: ctrlWrapper(register),
};
