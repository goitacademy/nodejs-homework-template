const jwt = require('jsonwebtoken');
const {HttpError} = require('../helpers');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET

const checkToken = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return next(HttpError(401, 'Не авторизовано'));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find user by id and token
    const user = await User.findOne({ _id: decoded._id, token });

    if (!user) {
      return next(HttpError(401, 'Не авторизовано'));
    }

    req.user = user; // Attach user data to the request
    next();
  } catch (error) {
    return next(HttpError(401, 'Не авторизовано'));
  }
};

module.exports = checkToken;
