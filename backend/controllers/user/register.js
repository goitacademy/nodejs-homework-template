const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { User } = require('../../models/userModel');
const HttpError = require('../../helpers/httpError');
const asyncHandler = require("express-async-handler");


const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) throw HttpError(409, 'Email already in use');

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email)

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarUrl
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatar : avatarUrl
    },
  });
});

module.exports = register;