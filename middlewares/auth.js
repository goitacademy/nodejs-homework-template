const jwt = require("jsonwebtoken");

const User = require("../service/schemas/user");

require("dotenv").config();

const SECRET = process.env.SECRET;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return res.status(401).json({
      status: "error",
      message: "Missing token",
      data: "Unauthorized",
    });
  }
  try {
    const { id } = jwt.verify(token, SECRET);
    const user = await User.findById(id);
    if (!user || user.token !== token || !user.token) {
      return res.status(401).json({
        status: "error",
        message: "Not valid",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      status: "error",
      message: "Internal error",
      data: "Unauthorized",
    });
  }
};

module.exports = auth;
