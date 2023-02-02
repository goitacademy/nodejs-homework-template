const RequestError = require("../helpers/RequestError");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if (!req.headers.authorization) throw RequestError(401, "Not authorized");

  const [tokenType, token] = req.headers.authorization.split(" ");

  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    if (!user) throw new Error();

    req.user = user;
    req.tokenType = tokenType;
    req.token = token;
    next();
  } catch (err) {
    throw RequestError(401, "Please provide a valid token");
  }
};

module.exports = auth;
