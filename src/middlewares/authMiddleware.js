const jwt = require("jsonwebtoken");
const { User } = require("../db/userModel");

const { NotAuthorizedError } = require("../helpers/errors");

const authMiddleware = async (req, res, next) => {
  const [tokenType, token] = req.headers["authorization"].split(" ");

  if (tokenType !== "Bearer") {
    next(new NotAuthorizedError("Token type must be Bearer"));
  }

  if (!token) {
    next(new NotAuthorizedError("Please, provide a token"));
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token || token !== user.token.toString()) {
      next(new NotAuthorizedError("Authorization error"));
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    next(new NotAuthorizedError("Invalid token"));
  }
};

module.exports = {
  authMiddleware,
};
