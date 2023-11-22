const jwt = require("jsonwebtoken");
const User = require("../models/users");
function author(req, res, next) {
  const authorHeader = req.headers["authorization"];
  if (typeof authorHeader === "undefined") {
    return res.status(401).send({ message: "Not authorized" });
  }
  const [bearer, token] = authorHeader.split(" ", 2);
  // console.log({ bearer, token });
  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Not authorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "Not authorized" });
    }
    try {
      req.user = decode;
      const user = await User.findById(decode.id);
      if (user === null) {
        return res.status(401).send({ message: "Not authorized" });
      }
      if (user.token !== token) {
        return res.status(401).send({ message: "Not authorized" });
      }
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  });
}
module.exports = author;
