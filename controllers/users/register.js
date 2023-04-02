const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");

const catchAsync = require("../../utils/catchAsync");
const { User } = require("../../models");

const registerController = catchAsync(async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
  });
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
});

module.exports = registerController;
