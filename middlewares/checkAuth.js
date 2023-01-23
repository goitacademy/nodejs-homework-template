const createError = require('http-errors');

const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

module.exports = {
  checkAuth: async (req, res, next) => {
    const { authorization = '' } = req.headers;

    const [type, token] = authorization.split(' ');

    try {
      if (type !== 'Bearer') {
        throw createError(401, 'Not authorized');
      }
      if (!token) {
        throw createError(401, 'Not authorized');
      }

      const { JWT_SECRET } = process.env;

      const { id } = jwt.verify(token, JWT_SECRET);

      const user = await User.findById(id);

      if (!user || !user.token) {
        throw createError(401, 'Not authorized');
      }

      req.user = user;

      next();
    } catch (err) {
      if (err.message === 'Invalid signature') err.status = 401;

      next(err);
    }
  },
};
