const jwt = require("jsonwebtoken");
const {customError} = require("../helpers/error");
const {User} = require("../models/user");
const {SECRET} = require("../config");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization || " ";
  const [tokenType, token] = authHeader.split(" ");

  if (tokenType === "Bearer" && token) {
    try {
      const verifiedToken = jwt.verify(token, SECRET);

      const user = await User.findById(verifiedToken.id);
      console.log("user", user);
      if (!user) {
        next(customError({status: 400, message: "No user with such id"}));
      }

      if (!user.token) {
        next(customError({status: 400, message: "Token is invalid"}));
      }

      req.token = token;
      req.user = user;
      console.log("token", token);
      return next();
    } catch (error) {
      console.log("error", error);
      if (error.name === "TokenExpiredError") {
        next(customError(error.name));
      }
      if (error.name === "JsonWebTokenError") {
        next(customError(error.name));
      }

      throw error;
    }
  }

  return next(customError({status: 401, message: "Not authorized"}));
};

module.exports = {authMiddleware};
