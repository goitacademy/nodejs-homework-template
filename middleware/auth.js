const jwt = require("jsonwebtoken");
const User = require("../models/users");

async function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (typeof authHeader !== "string") {
    return res.status(401).json({ error: "No token provided" });
  }

  const [bearer, token] = authHeader.split(" ", 2);

  // if (bearer !== "Bearer") {
  //   return res.status(401).json({ error: "No token provided" });
  // }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    req.user = { id: decoded.id, name: decoded.name };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Not authorized" });
  }
}
module.exports = auth;
