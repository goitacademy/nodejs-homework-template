const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  console.log('bearer:', bearer);
  console.log('token:', token);
  try {
    if (bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized');
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    console.log('id:', id);
    const user = await User.findById(id);
    console.log('user.token:', user.token);
    console.log('user:', user);
    // if (!user || !user.token) {
    if (!user || !user.token) {
      throw new Unauthorized('Not authorized');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === 'Invalid sugnature') {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
