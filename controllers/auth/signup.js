const bcrypt = require("bcryptjs");

const { User } = require("../../models/index.js");

const { HttpError } = require("../../helpers/index.js");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    subscription,
  });

  res.status(201).json({
    // name: newUser.name,
    subscription: newUser.subscription,
    email: newUser.email,
  });
};

module.exports = signup;
