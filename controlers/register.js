const bcrypt = require("bcrypt");
const { User } = require("../models");
const { HttpError, ctrlWrapper } = require("../helpers");

const resisterUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  res
    .status(201)
    .json({ email: newUser.email, subscription: newUser.subscription });
};

module.exports = ctrlWrapper(resisterUser);
