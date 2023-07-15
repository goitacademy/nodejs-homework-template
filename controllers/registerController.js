const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

const userRolesEnum = require('../constants/userRolesEnum');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const signToken = id => jwt.sign({ id }, process.env.JWT_SECRET);

exports.signup = catchAsync(async (req, res) => {
  const newUserData = {
    ...req.body,
    role: userRolesEnum.USER,
  };

  const user = await User.findOne({ email: req.body.email });

  if (user)
    return res.status(409).json({
      message: 'Email in use',
    });

  const newUser = await User.create(newUserData);
  newUser.password = undefined;

  const token = signToken(newUser.id);

  res.status(201).json({
    user: newUser,
    token,
  });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password -__v');

  if (!user) throw new AppError(401, 'Not authorized!');

  const passwordIsValid = await user.checkPassword(password, user.password);

  if (!passwordIsValid) throw new AppError(401, 'Not authorized!');

  user.password = undefined;

  const token = signToken(user.id);

  res.status(200).json({
    user,
    token,
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const unathorizedUser = User.findByIdAndUpdate(userId, { token: null });

  if (!unathorizedUser) throw new AppError(401, 'Not Authorized');

  res.status(204).end();
});

exports.getCurrentUser = catchAsync(async (req, res) => {
  const { email, subscription } = req.user;

  return res.status(200).json({
    email,
    subscription,
  });
});
