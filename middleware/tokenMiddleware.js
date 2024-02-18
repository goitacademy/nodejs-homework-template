require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const jwtSecret = process.env.JWT_SECRET;

const tokenMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("Received token:", token);
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ message: "Invalid authorization header" });
    }

    const decoded = jwt.verify(tokenParts[1], jwtSecret);
    console.log("Decoded token:", decoded);
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user || user.token !== token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in token middleware:", error);
    let errorMessage = "Internal Server Error";
    if (error.name === "JsonWebTokenError") {
      errorMessage = "Invalid token";
    } else if (error.name === "TokenExpiredError") {
      errorMessage = "Token expired";
    } else if (error.name === "SyntaxError") {
      errorMessage = "Malformed token";
    } else {
      errorMessage = error.message;
    }
    res.status(500).json({ message: errorMessage });
  }
};

module.exports = tokenMiddleware;
