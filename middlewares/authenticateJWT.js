const jwt = require("jsonwebtoken");
const { controlWrapper } = require("../decorators/index.js");
const { HttpError } = require("../helpers/HttpError.js");
const User = require("../models/users.js");

const { JWT_SECRET } = process.env;

const authenticateJWT = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new HttpError(401, "Authorization header not found"));
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(new HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      return next(new HttpError(401, "User not found"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(new HttpError(401, "Not authorized"));
  }
};

module.exports = controlWrapper(authenticateJWT);
