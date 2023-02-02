const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const httpError = require('http-errors');

module.exports = async (req, _, next) => {
  const { authorization = '' } = req.headers;

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    next(httpError(401, 'Not authorized'));
  }
  try {
    const { id } = jwt.verify(
      token,
      process.env.SECRET_KEY
    );

    const user = await User.findById(id);

    if (!user || !user.token) {
      next(httpError(401, 'Not authorized'));
    }
    req.user = user;

    next();
  } catch (error) {
    next(httpError(401, 'Not authorized'));
  }
};
