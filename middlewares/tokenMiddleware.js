const jwt = require("jsonwebtoken");
const { User } = require("../db/userModel");

const { UnauthorizedError } = require("../helpers/errors");

const tokenMiddleware = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(" ");

    // if (!token) {
    //   next(new UnauthorizedError("Not authorized"));
    // }

    const { _id } = jwt.decode(token, process.env.JWT_SECRET);
    const user = await User.findById(_id);

    if (!user || user.token !== token) {
      next(new UnauthorizedError("Not authorized"));
    }

    req.user = user;

    next();
  } catch (error) {
    next(new UnauthorizedError("Not authorized"));
  }
};

module.exports = { tokenMiddleware };
