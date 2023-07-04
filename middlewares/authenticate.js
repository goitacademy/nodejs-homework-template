const jwt = require('jsonwebtoken');

const { User } = require('../models');

const { HttpError } = require('../help');

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user) {
      next(HttpError(401));
    }
    req.user = user;
  } catch {
    next(HttpError(401));
  }

  next();
};

module.exports = authenticate;
