const jwt = require("jsonwebtoken");
const User = require("../models/users");

const unauthorizedError = (res) => {
  res.status(401).json({ message: "Not authorized" });
};

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") {
    throw new Error(401, "Token type is not valid");
  }

  if (!token) {
    throw new Error(401, "Not authorized");
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({ message: "Json web token id not valid" });
    }
    next(error);
  }
};

module.exports = authMiddleware;
