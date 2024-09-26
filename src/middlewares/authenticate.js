const jwt = require('jsonwebtoken');
const { HttpError } = require('../helpers');
const { User } = require('../models/user');

require('dotenv').config();
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next(new HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      return next(new HttpError(401));
    }
    req.user = user;
    next();
  } catch {
    next(new HttpError(401));
  }
};

module.exports = authenticate;
