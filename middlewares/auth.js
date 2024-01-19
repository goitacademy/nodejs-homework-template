const jwt = require("jsonwebtoken");
const User = require("../models/users");

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (typeof authHeader === "undefined") {
    return res.status(401).send({ message: "Invalid token" });
  }

  const [bearer, token] = authHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Invalid token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }

    const user = await User.findById(decode.id);

    if (user === null) {
      return res.status(401).send({ message: "Invalid token" });
    }

    if (user.token !== token) {
      return res.status(401).send({ message: "Invalid token" });
    }
    // console.log(decode);
    req.user = decode;
    next();
  });
}

module.exports = auth;
