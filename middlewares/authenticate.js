const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { User } = require("../models/user");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer = "", token = ""] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      //throw HttpError(401);
      next(HttpError(401));
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token || user.token !== token) {
        //throw HttpError(401);
        next(HttpError(401));
      }
      req.user = user;
      next();
    } catch (error) {
      throw HttpError(401, error.message);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;