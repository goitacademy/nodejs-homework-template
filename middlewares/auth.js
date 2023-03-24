const createError = require('http-errors');
const jwt = require('jsonwebtoken');

const { catchAsync } = require('../utils');
const { User } = require('../models');

const { SECRET_KEY } = process.env;

const auth = catchAsync(async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    throw createError(401, 'Not authorized');
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);
    if (!user) {
      throw createError(401, 'Not authorized');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === 'Invalid sugnature') {
      error.status = 401;
      throw error;
    }
  }
});

module.exports = auth;
