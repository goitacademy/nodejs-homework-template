// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const {HttpError} = require('../helpers');
const User = require('../models/User');

const checkToken = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return next(HttpError(401, 'Not authorized'));
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key'); // Change to your JWT secret key

    // Find user by id and token
    const user = await User.findOne({ _id: decoded._id, token });

    if (!user) {
      return next(HttpError(401, 'Not authorized'));
    }

    req.user = user; // Attach user data to the request
    next();
  } catch (error) {
    return next(HttpError(401, 'Not authorized'));
  }
};

module.exports = checkToken;
