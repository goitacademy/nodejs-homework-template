const jwt = require("jsonwebtoken");
const User = require("./models/User");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "401 Unauthorized",
        contentType: "application/json",
        responseBody: {
          message: "Not authorized",
        },
      });
    }

    const token = authorization.split(" ")[1];

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        status: "401 Unauthorized",
        contentType: "application/json",
        responseBody: {
          message: "Not authorized",
        },
      });
    }

    const user = await User.findById(decodedToken.id);

    if (!user || user.token !== token) {
      return res.status(401).json({
        status: "401 Unauthorized",
        contentType: "application/json",
        responseBody: {
          message: "Not authorized",
        },
      });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
