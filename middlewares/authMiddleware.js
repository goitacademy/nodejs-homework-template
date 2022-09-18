const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../helpers/errors");

const authMiddleware = (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(" ");

    if (!token) {
      next(new UnauthorizedError("Not authorized"));
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    next(new UnauthorizedError("Not authorized"));
  }
};

module.exports = {
  authMiddleware,
};
