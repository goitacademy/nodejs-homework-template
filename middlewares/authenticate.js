const { User } = require('../models/user');
const { HttpError } = require('../utils');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    console.log(bearer);
    next(HttpError({ status: 401, message: 'Unauthorized' }));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || token !== user.token) {
      console.log(user);
      console.log(token);
      next(HttpError({ status: 401, message: 'Unauthorized' }));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError({ status: 401, message: 'Unauthorized' }));
  }
};

module.exports = authenticate;
