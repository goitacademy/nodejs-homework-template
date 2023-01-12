const jwt = require("jsonwebtoken");
const { Unauthorized } = require("../helpers/errors");
const { User } = require("../db/userModel");

const authMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    next(new Unauthorized());
  }
  const [token] = req.headers.authorization.split(" ");
  if (!token) {
    next(new Unauthorized());
  }
  try {
    const userReq = jwt.decode(token, process.env.JWT_SECRET_KEY);
    const { _id } = userReq;
    const userDb = await User.findOne({ _id });
    if (!userDb || userDb.token !== token) {
      next(new Unauthorized());
    }
    req.user = userDb;

    next();
  } catch (error) {
    next(new Unauthorized());
  }
};

module.exports = {
  authMiddleware,
};
