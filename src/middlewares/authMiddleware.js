const jwt = require('jsonwebtoken');
const { findUser } = require('../model/authService');

const { MiddlewareUnauthorizedError } = require('../helpers/errors');

const authMiddleware = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(' ');

    if (!token) {
      next(new MiddlewareUnauthorizedError('Not authorized'));
    }

    const user = jwt.decode(token, process.env.JWT_SECRET);
    const { _id } = user;
    const checkUser = await findUser(_id);

    if (!checkUser) {
      next(new MiddlewareUnauthorizedError('User doesnt exist'));
    }
    checkUser.token = token;
    await checkUser.save();

    req.user = await checkUser;

    next();
  } catch (err) {
    next(new MiddlewareUnauthorizedError('Not authorized brfb'));
  }
};

module.exports = {
  authMiddleware,
};
