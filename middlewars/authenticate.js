const jwt = require('jsonwebtoken');
const { HTTPError } = require('../helpers');
const { User } = require('../models/user');
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    next(HTTPError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      next(HTTPError(401, 'Not authorized'));
    }
    if (!user.token) {
      next(HTTPError(401, 'Not authorized'));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HTTPError(401, 'Not authorized'));
  }
};

module.exports = authenticate;
