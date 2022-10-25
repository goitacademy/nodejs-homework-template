const jwt = require('jsonwebtoken');
const { User } = require('../models/auth');
const { createReject } = require('../utils');

const authorizationMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
      throw createReject(401, 'Not authorized');
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);

    if (!user) {
      throw createReject(401, 'Not authorized');
    }
    req.user = user;

    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = 'Not authorized';
    }
    next(error);
  }
};

module.exports = authorizationMiddleware;
