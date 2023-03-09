const User = require("../../models/users");
const gravatar = require("gravatar");
const { createError } = require("../../helpers");

const bcrypt = require("bcryptjs");

async function registerUser(req, res, next) {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { protocol: "https" });
  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
  });
  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
  });
}

module.exports = registerUser;
