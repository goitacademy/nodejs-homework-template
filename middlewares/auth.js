const createError = require('http-errors');
const jwt = require('jsonwebtoken');

const { catchAsync } = require('../utils');
const { User } = require('../models');

const { SECRET_KEY } = process.env;

const auth = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith('Bearer') &&
    req.headers.authorization.split(' ')[1];
  if (!token) return next(createError(401, 'Not authorized'));

  let decoded;

  try {
    decoded = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(createError(401, 'Not authorized'));
  }

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) return next(createError(401, 'Not authorized'));

  req.user = currentUser;

  next();
});

module.exports = auth;
