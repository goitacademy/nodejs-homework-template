const jwt = require("jsonwebtoken");
const User = require('../models/user');

async function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).send({ message: "Invalid Token" });
  }

  const [bearer, token] = authHeader.split(" ", 2);
  if (bearer !== "Bearer") {
    return res.status(403).send({ message: "Invalid Token" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode.id).exec();
    if (!user || user.token !== token) {
      return res.status(401).send({ message: "Not authorized" });
    }

    req.user = { id: user._id, email: user.email };
    // console.log(req.user);

    next();
  } catch (err) {
    return res.status(401).send({ message: "Not authorized" });
  }
}

module.exports = auth;
