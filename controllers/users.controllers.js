const bcrypt = require("bcrypt");

const { ctrlWrapper } = require("../utils");
const User = require("../models/user");
const HttpError = require("../helpers/HttpError");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError.ConflictError("Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
