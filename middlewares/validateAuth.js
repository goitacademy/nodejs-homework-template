const jwt = require('jsonwebtoken');
const { Unauthorized } = require('http-errors');
const { HTTP_STATUS_CODE, MESSAGES } = require('../helpers/constants');

const { User } = require('../models');

const { SECRET_KEY } = process.env;

const validateAuth = async (req, _, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization?.split(' ');

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    const checkingTokenBearerUser =
      bearer !== MESSAGES.BEARER || !user || !user.token;
    if (checkingTokenBearerUser) {
      throw new Unauthorized(MESSAGES.NOTAUTHORIZED);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === MESSAGES.INVALIDSIGNATURE || MESSAGES.JWTEXPIRED) {
      error.status = HTTP_STATUS_CODE.UNAUTHORIZED;
    }

    next(error);
  }
};

module.exports = validateAuth;
