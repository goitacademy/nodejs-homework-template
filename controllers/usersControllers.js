const User = require("../models/usersModel");
const AppError = require("../utils/appError");
const cathAsync = require("../utils/catchAsync");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// USER REGISTRATION
exports.registrUser = cathAsync(async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = { ...req.body, password: hashedPassword };
  const newUser = await User.create(user);
  //   newUser.password = undefined;
  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
});

// USER LOGIN
exports.loginUser = cathAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new AppError(401, "Email or password is wrong");

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) throw new AppError(401, "Email or password is wrong");

  const payload = { id: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
});

// LOGOUT USER
exports.logoutUser = cathAsync(async (req, res) => {
  // ТУТ ТРЕБА ВИДАЛИТИ ТОКЕН

  res.sendStatus(204);
});

// GET CURRENT USER
exports.currentUser = cathAsync(async (req, res) => {
  //   console.log(req.user);
  const { email, subscription } = req.user;
  const currUs = { email, subscription };

  res.status(200).json(currUs);
});
