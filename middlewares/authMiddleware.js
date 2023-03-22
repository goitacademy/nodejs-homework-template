const { decode } = require("jsonwebtoken");
const { HttpError } = require("../helpers/httpError");

const authMiddleware = (req, res, next) => {
  try {
    const [tokenType, token] = req.headers.authorization.split(" ");

    if (!token) {
      next(new HttpError(401, "Please, provide a token"));
    }

    const user = decode(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    next(new HttpError(401, "Invalid token"));
  }
};

module.exports = {
  authMiddleware,
};
