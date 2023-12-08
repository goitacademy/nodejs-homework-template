const jwt = require('jsonwebtoken');

const HttpError = require('../httpErrors/errors');
const { User } = require('../models/userSchema');

const authenticate = async (req, _, next) => {
  try {
    const { authorization = ' ' } = req.headers;
    const [bearer, token] = authorization.split(' ', 2);

    if (bearer !== 'Bearer') {
      return next(new HttpError(401, 'Invalid authorization header.'));
    }

    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      return next(new HttpError(401, 'User not authenticated.'));
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
