const bcrypt = require("bcryptjs");

const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const handlePassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    password: handlePassword,
    email,
    subscription,
  });
  res
    .status(201)
    .json({ email: newUser.email, subscription: newUser.subscription });
};

module.exports = { register: ctrlWrapper(register) };
