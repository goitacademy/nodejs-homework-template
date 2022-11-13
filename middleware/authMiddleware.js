const { Conflict } = require("http-errors");
const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const [tokenType, token] = req.headers["authorization"].split(" ");
  if (!token) {
    next("error");
  }
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    next(new Conflict(`bad decode`));
  }
};
module.exports = { auth };
