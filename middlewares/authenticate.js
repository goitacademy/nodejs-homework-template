const jwt = require('jsonwebtoken');

const { HttpError } = require('../utils');
const { UserModel } = require('../models');

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  console.log('bearer--------->', bearer);

  if (bearer !== 'Bearer') {
    next(HttpError(401, 'Not authorized --->bearer'));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    console.log('id--------->>>>>>>>', id);

    const user = await UserModel.findById(id);
    console.log('user------->>>>>>', user);

    if (!user) {
      next(HttpError(401, 'Not authorized -->>user'));
    }

    req.user = user._id;

    next();
  } catch (error) {
    next(HttpError(401, 'Not authorized --->>error'));
  }
};

module.exports = authenticate;
