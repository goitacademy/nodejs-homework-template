const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/user");

async function authMiddleware(req, res, next) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, config.jwtSecret);

    const user = await User.findOne({ _id: decoded.userId, token });

    if (!user || !user.token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized" });
  }
}

module.exports = authMiddleware;
