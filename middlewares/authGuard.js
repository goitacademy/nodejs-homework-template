const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const { HttpCode } = require('../helpers/constants');
const { CustomError } = require('../helpers/errors');
const { findUserByEmail } = require('../model/users');

const authGuard = async (req, res, next) => {
  const token = req.get('Authorization')?.split(' ')[1];
  if (!token) {
    next(new CustomError(HttpCode.UNAUTHORIZED, 'Not authorized'));
  }
  try {
    const user = jwt.decode(token, SECRET_KEY);
    req.user = user;
    const userInDb = await findUserByEmail(user.id);
    if (!userInDb || userInDb.token !== token) {
      next(new CustomError(HttpCode.UNAUTHORIZED, 'Not authorized'));
    }
    next();
  } catch (error) {
    next(new CustomError(HttpCode.UNAUTHORIZED, 'Not authorized'));
  }
};

module.exports = { authGuard };