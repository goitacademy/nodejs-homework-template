const { jwtVerify } = require("../utils/jwt.util");
const User = require("../models/user.model");

const isAuthorized = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
  const [, newToken] = token.split(" ");
  const decoded = jwtVerify(newToken);
  const user = await User.findOne({ _id: decoded._id });
  req.user = user;
  next();
};

module.exports = { isAuthorized };
