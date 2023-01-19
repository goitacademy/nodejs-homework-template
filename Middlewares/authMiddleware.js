const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const { SECRET_KEY } = process.env;

const authMiddleware = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  console.log(token);
  try {
    if (bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized');
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new Unauthorized('Not authorized');
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    if (
      error.message === 'Invalid sugnature' ||
      error.message === 'jwt expired'
    ) {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = authMiddleware;
