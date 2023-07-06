const User = require("../models/User");

const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
require("dotenv").config();

const userAuth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Unauthorized",
      data: "Unauthorized",
    });
  }
  try {
    const { id } = jwt.verify(token, secret);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Unauthorized",
      data: "Unauthorized",
    });
  }
};
module.exports = userAuth;
