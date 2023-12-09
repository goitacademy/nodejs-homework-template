const { User } = require("../models/Users");

const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const dotenv = require("dotenv");
dotenv.config();
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      next(HttpError(401, "Not authorized"));
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token || user.token !== token) {
        next(HttpError(401, "Not authorized"));
      }
      req.user = user;
      next();
    } catch (error) {
      next(HttpError(401, error.message));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
