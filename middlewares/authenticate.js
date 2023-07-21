const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { User } = require("../models/user");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [label, token] = authorization.split(" ");
  if (label !== "Bearer") next(HttpError(401));
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(id);
    // findOne({ token });

    if (!user || !user.token || user.token !== token) next(HttpError(401));

    req.user = user;
  } catch {
    next(HttpError(401));
  }
  next();
};

module.exports = authenticate;
