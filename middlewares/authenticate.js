const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { httpError } = require('../utils');

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(httpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || token !== user.token.toString()) {
      next(httpError(401));
    }
    req.user = user;
    next();
  } catch {
    next(httpError(401));
  }
};

module.exports = authenticate;
