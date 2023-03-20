const { User } = require('../models/user');
const { Unathorized } = require('http-errors');
const jwt = require('jsonwebtoken');

const authCheck = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  try {
    if (bearer !== 'Bearer') {
      throw new Unathorized('Not authorized');
    }
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new Unathorized('Not authorized');
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === 'Invalid signature') {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = authCheck;