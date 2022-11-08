const jwt = require('jsonwebtoken');
const { requestError } = require('../helpers');
const { User } = require('../models/user');

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;

  const [bearer, token] = authorization.split(' ');

  try {
    if (bearer !== 'Bearer') {
      throw requestError(401, 'Not authorized');
    }

    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token) {
      throw requestError(401, 'Not authorized');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === 'invalid signature') {
      error.status = 401;
    }

    next(error);
  }
};

module.exports = auth;
