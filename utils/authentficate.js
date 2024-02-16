const jwt = require("jsonwebtoken");
const { HttpError } = require("./HttpError");
const { User } = require("../models/User");

const { ACCESS_TOKEN_SECRET } = process.env;

const authentificate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return next(new HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const user = await User.findById(id);

    if (!user || !user.token) {
      return next(new HttpError(401));
    }

    req.user = user;
    next();
  } catch {
    next(new HttpError(401));
  }
};

module.exports = { authentificate };
