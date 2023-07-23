const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const User = require('../models/user');

const authenticate = async (req, res, next) => {
  const { authorization = " " } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== "Bearer") {
    const error = new Error("Invalid token format");
    error.statusCode = 401;
    return next(error);
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    req.user = { id };
    const user = await User.findById(id);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    req.user = user;
    next();
  } catch (err) {
    const error = new Error("Invalid or expired token");
    error.statusCode = 401;
    next(error);
  }
};

module.exports = authenticate;