const jwt = require("jsonwebtoken");
const User = require("../models/users");
const HttpError = require("../helpers/HttpError");

const checkToken = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      message: "Not Authorized!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.token !== token) {
      return res.status(401).json({
        message: "Not Authorized!",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not Authorized!",
    });
  }
};

module.exports = checkToken;
