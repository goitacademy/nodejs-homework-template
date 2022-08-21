const jwt = require('jsonwebtoken');
const { createError } = require('../helpers/errors');

const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    throw createError(401, 'You need to use Authorization token! Not authorized');
  }

  const [tokenType, token] = req?.headers?.authorization?.split(' ');
  console.log(tokenType, token);

  if (!token) {
    throw createError(401, 'Not authorized');
  }

  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    // записывает на сам запрос данные про user'a и его token
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    throw createError(401, 'Not authorized');
  }
};

module.exports = authMiddleware;
