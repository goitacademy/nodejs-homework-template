const jwt = require("jsonwebtoken");
const { User } = require("../db/userModel");
const { UnauthorizedError } = require("../helpers/errors");

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      next(new UnauthorizedError("Not authorized"));
    }

    const [, token] = authorization.split(" ");

    if (!token) {
      next(new UnauthorizedError("Not authorized"));
    }

    const user = jwt.decode(token, process.env.JWT_SECRET);

    const findUser = await User.findOne({ _id: user._id });
    if (!findUser) {
      next(new UnauthorizedError("Not authorized"));
    }
    req.token = token;
    req.user = findUser;
    next();
  } catch (err) {
    next(new UnauthorizedError("Not authorized"));
  }
};

module.exports = {
  authMiddleware,
};
