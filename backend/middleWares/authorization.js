const jwt = require('jsonwebtoken');
const HttpError = require('../helpers/httpError');
const { User } = require('../models/userModel');

const { SECRET_KEY } = process.env;

const authorization = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) next(HttpError(401));
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) next(HttpError(401));
    req.user = user;
    next();
  } catch (e) {
    next(HttpError(401));
  }
};

module.exports = authorization;