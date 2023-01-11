const jwt = require("jsonwebtoken");
const { User } = require("../../db");
const { httpError } = require("../../helpers");

const authMiddleware = () => {
  return async (req, res, next) => {
    // eslint-disable-next-line dot-notation
    if (!req.headers["authorization"])
      return next(httpError(401, "Not authorized"));

    // eslint-disable-next-line dot-notation
    const [, token] = req.headers["authorization"].split(" ");

    const parcedToken = await jwt.decode(token, process.env.JWT_SECRET);
    if (!parcedToken) return next(httpError(401, "Not authorized"));

    const { _id } = parcedToken;
    const user = await User.findById(_id);

    if (!user || user.token !== token)
      return next(httpError(401, "Not authorized"));

    req.user = user;
    next();
  };
};

module.exports = { authMiddleware };
