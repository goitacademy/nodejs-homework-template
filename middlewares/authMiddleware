require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const tokenValue = token.split(" ")[1];
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.token !== tokenValue) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = authMiddleware;
