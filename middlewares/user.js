const { createError } = require('../helpers/error.js');
const jwt = require('jsonwebtoken');
const servicesUser = require('../services/user.js');

const userMiddleware = async (req, _, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      throw createError(401, 'not a bearer token');
    }

    if (!token) {
      throw createError(401, 'token is not find');
    }

    const data = jwt.verify(token, process.env.SECRET_KEY);
    if (!data) {
      throw createError(401, 'Not authorized');
    }

    const user = await servicesUser.findUserById(data.id);
    if (!user) {
      throw createError(401);
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    next(createError(401, e.message));
  }
};

module.exports = { userMiddleware };
