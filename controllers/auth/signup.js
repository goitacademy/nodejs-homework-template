const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User } = require("../../models/index.js");

const { HttpError } = require("../../helpers/index.js");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    subscription,
    avatarUrl,
  });

  res.status(201).json({
    // name: newUser.name,
    subscription: newUser.subscription,
    email: newUser.email,
    avatarUrl: newUser.avatarUrl,
  });
};

module.exports = signup;
