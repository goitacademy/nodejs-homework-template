const jwt = require("jsonwebtoken");
const HTTPError = require("../helpers/HTTPError");

module.exports = (req, res, next) => {
  const [bearer, token] = req.headers.authorization.split(" ");
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    res.locals.user = decoded;
    next();
  } catch (error) {
    res.status(401);
    throw HTTPError(401);
  }
};
