const { ctrlWrapper } = require("../decorators");
const { httpError } = require("../helpers");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email } = req.body;
  const isExist = await User.findOne({ email });

  if (isExist) {
    throw httpError(409, `User with email ${email} already exists`);
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const { email: userEmail, name } = await User.create({
    ...req.body,
    password: hashedPassword,
  });
  res.status(201).json({ userEmail, name });
};

module.exports = {
  register: ctrlWrapper(register),
};
