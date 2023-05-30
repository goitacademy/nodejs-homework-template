const { User } = require("../models/user");
const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../decorators/");

const register = async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    email: newUser.email,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
