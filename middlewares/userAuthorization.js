const { User } = require('../models');
const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
async function userAuthorization(req, res, next) {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  try {
    if (bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized');
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const userAuthorizationById = await User.findById(id);
    if (!userAuthorizationById || !userAuthorizationById.token) {
      throw new Unauthorized('Not authorized');
    }
    req.user = userAuthorizationById;
    next();
  } catch (error) {
    if (error.message === 'invalid signature') {
      error.status = 401;
    }
    next(error);
  }
}

module.exports = userAuthorization;
