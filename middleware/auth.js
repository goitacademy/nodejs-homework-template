const { jwtVerify } = require("../utils/jwt.util");
const User = require("../models/user.model");

const isAuthorized = async (req, res, next) => {
  const token = req.headers.authorization;
  // console.log("🚀 ~ file: auth.js:3 ~ isAuthorized ~ token", token);
  if (!token) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
  const [, newToken] = token.split(" ");
  // console.log("🚀 ~ file: auth.js:13 ~ isAuthorized ~ newToken", newToken);

  const decoded = jwtVerify(newToken);
  // console.log("🚀 ~ file: auth.js:13 ~ isAuthorized ~ decoded", decoded);
  const user = await User.findOne({ _id: decoded._id });
  // console.log("🚀 ~ file: auth.js:15 ~ isAuthorized ~ user", user);

  req.user = user;
  next();
};

module.exports = { isAuthorized };
