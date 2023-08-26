const jwt = require("jsonwebtoken");
const User = require("../models/users");

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (typeof authHeader !== "string") {
    return res.status(401).json({ error: "No token provided" });
  }

  const [bearer, token] = authHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      if (err.name === "Not authorized" || err.name === "JsonWebTokenError") {
        return res.status(401).send({ message: "Not authorized" });
      }
      return next(err);
    }
    try {
      const user = await User.findById(decode.id);

      if (user.token !== token) {
        return res.status(401).send({ message: "Not authorized" });
      }
      req.user = { id: decode.id, name: decode.name };
      next();
    } catch (error) {
      next(error);
    }
  });
}
module.exports = auth;
