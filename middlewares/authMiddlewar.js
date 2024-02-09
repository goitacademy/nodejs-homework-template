const jwt = require("jsonwebtoken");
const User = require("../models/User");

const unauthorizedError = (res) => {
  res.status(401).json({ message: "Not authorized" });
};

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return unauthorizedError(res);
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const user = await User.findById(userId);

    if (!user || user.token !== token) {
      return unauthorizedError(res);
    }

    req.user = user;
    next();
  } catch (error) {
    return unauthorizedError(res);
  }
};

module.exports = authMiddleware;
