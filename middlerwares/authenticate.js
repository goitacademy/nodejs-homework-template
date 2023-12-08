const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized Beare"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !token) {
      next(HttpError(401, "Not authorized Token"));
    }
    req.user = user;

    next();
  } catch {
    next(HttpError(401, "Not authorized ERRR"));
  }
};

module.exports = authenticate;
