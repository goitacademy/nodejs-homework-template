const jwt = require("jsonwebtoken");

// const { NotAuthorizedError } = require("../helpers/errors");

async function authMiddleware(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return res.status(401).json({ message: "Invalid header title" });
  }

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  const user = jwt.decode(token, process.env.JWT_SECRET);
  req.token = token;
  req.user = user;
  next();
}

module.exports = { authMiddleware };
