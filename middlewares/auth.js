const jwt = require("jsonwebtoken");

const { User } = require("../models");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  try {
    if (bearer !== "Bearer") {
      res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized!",
      });
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    console.log("user", user);
    console.log("user.token", user.token);
    if (!user || !user.token) {
      res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized!",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
};

module.exports = auth;
