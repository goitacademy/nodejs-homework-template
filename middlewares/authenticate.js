const { User } = require('../models/user');
const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer = '', token = ''] = authorization.split(' ');
  if (bearer !== 'Bearer' || token === '') {
    next(Unauthorized('Not authorized'));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || token !== String(user.token)) {
      next(Unauthorized('Not authorized'));
    }
    req.user = user;
    next();
  } catch (error) {
    next(Unauthorized('Not authorized'));
  }
};

module.exports = authenticate;