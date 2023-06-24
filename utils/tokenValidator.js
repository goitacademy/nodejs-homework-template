const jwt = require("jsonwebtoken");
const { KEY } = process.env;
const User = require("../models/user");

const validateToken = async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Not authorized" });
  }

  let decoded = "";

  try {
    decoded = jwt.verify(token, KEY);
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }

  const currentUser = await User.findById(decoded.id);

  if (!currentUser || currentUser.token !== token) {
    res.status(401).json({ message: "Not authorized" });
  }

  req.user = currentUser;

  next();
};

module.exports = validateToken;
