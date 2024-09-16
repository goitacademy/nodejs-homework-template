const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");
const secret = process.env.JWT_SECRET;

const userAuth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    res.status(401).json({
      status: "error",
      code: 401,
      message: "Unauthorized",
    });
    return;
  }
  try {
    const { id } = jwt.verify(token, secret);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
      });
      return;
    }
    req.user = user;
    next();
  } catch {
    res.status(401).json({
      status: "error",
      code: 401,
      message: "Unauthorized",
    });
  }
};

module.exports = userAuth;
