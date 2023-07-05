const bcrypt = require('bcrypt');
const { User } = require('../../models/userModel');
const HttpError = require('../../helpers/httpError');
const asyncHandler = require("express-async-handler");


const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) throw HttpError(409, 'Email already in use');

  const hashPassword = await bcrypt.hash(password, 20);
  

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
});

module.exports = register;