const jwt = require("jsonwebtoken");
const { NotAutorizedError } = require("../helpers/errors");
const authMiddelwares = (req, res, next) => {
  const [tokenType, token] = req.headers["authorization"].split(" ");
  if (!token) {
    next(new NotAutorizedError("Please, provide a token"));
  }
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.tokenType = tokenType;
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(new NotAutorizedError("Invalid token"));
  }
};

module.exports = {
  authMiddelwares,
};
