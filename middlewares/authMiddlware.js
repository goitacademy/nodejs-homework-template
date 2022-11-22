const jwt = require("jsonwebtoken");
const { NotAutorizedError } = require("../helpers/errors");
const authMiddleware = (req, res, next) => {
  const [tokenType, token] = req.headers["authorization"].split(" ");
  if (!token) {
    next(new NotAutorizedError("Not authorized"));
  }
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    next(new NotAutorizedError("Not authorized"));
  }
};

module.exports = { authMiddleware };
