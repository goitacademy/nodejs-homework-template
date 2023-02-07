const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = async (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const [tokenType, token] = req.headers.authorization.split(" ");

  if (!token) {
    res.status(401).json({ message: "Not authorized" });
  }

  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = {
  authMiddleware,
};
