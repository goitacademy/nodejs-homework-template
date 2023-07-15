const jwt = require('jsonwebtoken');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const { signupUserValidator } = require('../utils/authValidators');

exports.authMiddleware = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith('Bearer') && req.headers.authorization.split(' ')[1];

  if (!token) {
    throw new AppError(401, 'Not authorized');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.id });
    if (!user) {
      throw new Error();
    }
    req.user = user;
  } catch (error) {
    throw new AppError(401, 'Not authorized');
  }

  next();
});

exports.checkSignup = catchAsync(async (req, res, next) => {
  const { error, value } = signupUserValidator(req.body);

  if (error) throw new AppError(400, 'Joi or other validation library error');

  const userExists = await User.exists({ email: value.email });

  if (userExists) throw new AppError(409, 'Email is already in use');

  req.body = value;

  next();
});
