const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const RequestError = require('../helpers/requestError');

module.exports = async (req, res, next) => {
  const { authorization = '' } = req.headers;

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(RequestError(401, 'Not authorized'));
  }
  try {
    const { id } = jwt.verify(token, process.env.SECRET);

    const user = await User.findById(id);

    if (!user || !user.token) {
      next(RequestError(401, 'Not authorized'));
    }
    req.user = user;

    next();
  } catch (error) {
    next(RequestError(401, 'Not authorized'));
  }
};
