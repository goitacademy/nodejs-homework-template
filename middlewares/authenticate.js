const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
// const User = require("../models/user");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    req.user = decodedToken;

    next();
  });
};

module.exports = { authenticate };
