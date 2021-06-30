const jwt = require('jsonwebtoken');

const { NotAuthorizedError } = require('../helpers/errors');

async function authenticationMiddleware(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      next(
        new NotAuthorizedError(
          'Please, provide a token in request authorization header',
        ),
      );
    }

    const [, token] = authorization.split(' ');

    console.log(token);

    if (!token) {
      next(new NotAuthorizedError('Token is required!!'));
    }

    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(new NotAuthorizedError('Invalid token'));
  }
}

module.exports = { authenticationMiddleware };
