const jwt = require("jsonwebtoken");

// const { NotAuthorizedError } = require("../helpers/errors");

const authMiddleware = (req, res, next) => {
  const { authorization, contentType, "x-token": token } = req.headers;
  if (!token) {
    return res
      .status(401)
      .json({ message: "error", description: "Not successful, unknown error" });
  }

  if (!token) {
    return res.status(401).json({
      message: "unauthorized",
      description: "Not successful, invalid token",
    });
  }

  const user = jwt.decode(token, process.env.JWT_SECRET);
  req.token = token;
  req.user = user;
  next();
};

module.exports = { authMiddleware };
