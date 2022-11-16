const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helpers");
const { User } = require("../models/userModel");

const { JWT_SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const [, token] = authHeader.split(" ");
  if (!token) {
    return next(NotAuthorizedError());
  }
  try {
    const verifiedToken = jwt.decode(token, JWT_SECRET);
    console.log("token is valid", verifiedToken);

    const user = await User.findById(verifiedToken._id);
    if (token !== user.token) {
      return next(NotAuthorizedError());
    }

    req.token = token;
    req.user = user;
    return next();
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  authMiddleware,
};
