const jwt = require("jsonwebtoken");

const { NotAuthorizedError } = require("../helpers/errors");

async function authMiddleware(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      next(new NotAuthorizedError("Not authorized"));
    }

    const [, token] = authorization.split(" ");

    if (!token) {
      next(new NotAuthorizedError("Token is required!!"));
    }

    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(new NotAuthorizedError("Invalid token"));
  }
}

module.exports = { authMiddleware };
