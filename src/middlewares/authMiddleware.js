const jwt = require("jsonwebtoken");
const { User } = require("../db/userModel");
const { NotAuthorizedError } = require("../helpers/errors");

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(new NotAuthorizedError("Please, provide token"));
  }

  const [, token] = authorization.split(" ");
  if (!token) {
    next(new NotAuthorizedError("Please, provide token"));
  }

  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);

    if (!user) {
      next(new NotAuthorizedError("Invalid token"));
    }

    const chosenUser = await User.findById(user._id);

    if (!chosenUser) {
      next(new NotAuthorizedError("Not authorized"));
    }

    if (chosenUser.token && chosenUser.token !== token) {
      next(new NotAuthorizedError("Not authorized"));
    }

    req.token = token;
    req.user = user;
    user.token = token;
    next();
  } catch (error) {
    next(new NotAuthorizedError("Invalid token"));
  }
};

module.exports = {
  authMiddleware,
};
