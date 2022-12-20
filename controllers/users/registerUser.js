const bcrypt = require("bcryptjs");
const { createError } = require("../../helpers");

const gravatar = require("gravatar");

const User = require("../../models/users");

async function registerUser(req, res) {
  const { email, password } = req.body;

  const userInBase = await User.findOne({ email });

  if (userInBase) {
    throw createError({
      status: 409,
      meassage: "User with this Email is already in base",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email, { protocol: "https" });

  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    email: result.email,
  });
}

module.exports = registerUser;
