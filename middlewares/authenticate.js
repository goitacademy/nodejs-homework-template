const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const { Unauthorized } = require('http-errors');

module.exports = async (req, _, next) => {
  const { SECRET_KEY } = process.env;

  const { authorization = '' } = req.headers;

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    next(
      Unauthorized(
        'Authorization header is missing or invalid'
      )
    );
  }

  try {
    const { _id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(_id).select(
      'email subscription token'
    );

    if (!user || !user.token) {
      next(
        Unauthorized('User not found or token is invalid')
      );
    }

    req.user = user;

    next();
  } catch (error) {
    next(Unauthorized(error.message || 'Not authorized'));
  }
};
