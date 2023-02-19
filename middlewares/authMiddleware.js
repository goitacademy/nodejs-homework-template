const jwt = require("jsonwebtoken");
const { RequestError } = require("../helpers/requestError");

const authMiddleware = async (req, res, next) => {
  const [tokenType, token] = req.headers["authorization"].split(" ");

  if (!token) {
    next(RequestError(401, "Not authorized"));
  }

  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(RequestError(401, "Invalid token"));
  }
};

module.exports = { authMiddleware };
