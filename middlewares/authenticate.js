const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { User } = require("../models/user");
const { SECRET } = process.env;

const Authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw HttpError(401);
    }
    try {
      const { id } = jwt.verify(token, SECRET);
      const user = await User.findById(id);
      if (!user || !user.token || user.token !== token) {
        throw HttpError(401);
      }
      req.user = user;
      next();
    } catch (error) {
      throw HttpError(401);
    }
  } catch (error) {
    next(error);
  }
};
module.exports = Authenticate;
