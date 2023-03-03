const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { RequestError } = require("../utils");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      next(RequestError(401));
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || user.token !== token) {
      next(RequestError(401));
    }
    req.user = user;
    next();
  } catch {
    next(RequestError(401));
  }
};

module.exports = authenticate;
