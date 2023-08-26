const jwt = require("jsonwebtoken");

const errorHandler = require("../helpers/errorsHandler");
const { User } = require("../models/userModel");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(errorHandler(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(errorHandler(401));
    }
    req.user = user;
    next();
  } catch (error) {
    next(errorHandler(401));
  }
};

module.exports = authenticate;
