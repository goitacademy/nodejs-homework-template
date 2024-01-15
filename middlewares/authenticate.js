const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { envsConfig } = require("../configs");
const { User } = require("../models/user");

const authentication = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(HttpError(401, 'Unauthorized'))
  }

  try {
    const { id } = await jwt.verify(token, envsConfig.secret);
    const user = await User.findById(id);
    if (user.token !== token) {
      next(HttpError(401, 'Unauthorized'))
    }
    req.user = { id: user.id, email: user.email, subscription: user.subscription };
  } catch {
    next(HttpError(401, 'Unauthorized'))
  }
  
  next()
};


module.exports = authentication;