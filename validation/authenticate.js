const { text } = require("express");
const { isError } = require("joi");
const jwt = require("jsonwebtoken");
const { User } = require("../model");
const authenticate = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(" ");
    if (bearer !== "Bearer") {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Not authorized",
      });
    }
    const { SECRET_KEY } = process.env;
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Not authorized",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = authenticate;
