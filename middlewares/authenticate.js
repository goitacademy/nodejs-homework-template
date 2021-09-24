/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ');
    if (bearer !== 'Bearer') {
      return res.status(401).json({
        status: 'Unauthorized',
        message: 'Not authorized',
      });
    }
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).json({
        status: 'Unauthorized',
        message: 'Not authorized',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
