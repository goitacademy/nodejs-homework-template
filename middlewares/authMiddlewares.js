const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { signupUserDataValidator } = require('../utils/userValidators');

/**
 * Signup User data validation middleware
 */
exports.checkSignupUserData = catchAsync(async (req, res, next) => {
  const { error, value } = signupUserDataValidator(req.body);

  if (error) throw new AppError(400, 'Invalid user data..');

  const userExists = await User.exists({ email: value.email });

  if (userExists) throw new AppError(409, 'User with this email already exists..');

  req.body = value;

  next();
});

/**
 * Protect middleware. Allow only logged in users.
 */
exports.protect = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.startsWith('Bearer') && req.headers.authorization.split(' ')[1];

  if (!token) throw new AppError(401, 'Not logged in!');

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err.message);

    throw new AppError(401, 'Not logged in!');
  }

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) throw new AppError(401, 'Not logged in!');

  req.user = currentUser;

  next();
});

/**
 * Roles Guard middleware
 * Use ONLY after 'protect' middleware
 */
exports.allowFor = (...subscriptions) =>
  (req, res, next) => {
    if (subscriptions.includes(req.user.subscription)) return next();

    next(new AppError(403, 'You are not allowed to view this resource'));
  };