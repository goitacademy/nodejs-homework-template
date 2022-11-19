const { Conflict, Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [tokenType, token] = authHeader.split(" ");
  if (tokenType === "Bearer" && token) {
    try {
      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(verifiedToken._id);
      if (!user) {
        next(new Unauthorized("No user with such id"));
      }
      console.log(user.token);
      if (!user.token) {
        next(new Unauthorized("Not authorized"));
      }
      if (!verifiedToken) {
        next(new Unauthorized("Not authorized"));
      }
      req.user = user;

      return next();
    } catch (e) {
      next(new Conflict(`Not authorized`));
    }
    return next(new Unauthorized("No token"));
  }
};
module.exports = { auth };
