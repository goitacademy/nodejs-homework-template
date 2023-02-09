const { HttpError } = require('../helpers');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, JWT_KEY);
    const findUser = await user.findById(id);
    if (!findUser || !findUser.token) {
      next(HttpError(401));
    }
    req.user = findUser;
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = authenticate;
