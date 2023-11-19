const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function auth(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (typeof authHeader === "undefined") {
    return res.status(401).send({ message: "Invalid Token" });
  }

  const [bearer, token] = authHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Invalid Token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "Invalid Token" });
    }

    try {
      req.user = decode;
      const user = await User.findById(decode.id).exec();
      if (user === null) {
        return res.status(401).send({ message: "Invalid Token" });
      }

      if (user.token !== token) {
        return res.status(401).send({ message: "Invalid Token" });
      }

      req.user = { id: user._id, email: user.email };

      next();
    } catch (error) {
      next(error);
    }
  });
}

module.exports = auth;
