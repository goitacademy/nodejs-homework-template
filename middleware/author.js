const jwt = require("jsonwebtoken");
const User = require("../models/users");
function sendUnauthorized(res) {
  return res.status(401).send({ message: "Not authorized" });
}
function author(req, res, next) {
  const authorHeader = req.headers["authorization"];
  if (typeof authorHeader === "undefined") {
    return sendUnauthorized(res);
  }
  const [bearer, token] = authorHeader.split(" ", 2);
  if (token === null) {
    return sendUnauthorized(res);
  }
  if (bearer !== "Bearer") {
    return sendUnauthorized(res);
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      return sendUnauthorized(res);
    }
    try {
      req.user = decode;
      const user = await User.findById(decode.id);
      if (user === null) {
        return sendUnauthorized(res);
      }
      if (user.token !== token) {
        return sendUnauthorized(res);
      }
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  });
}
module.exports = author;
