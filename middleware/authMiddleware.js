const jwt = require("jsonwebtoken");
function auth(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (typeof authHeader === "undefined") {
    return res.status(401).send({ message: "Invalid Token" });
  }

  const [bearer, token] = authHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Invalid Token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "Invalid Token" });
    }
    req.user = decode;
    next();
  });
}

module.exports = auth;
