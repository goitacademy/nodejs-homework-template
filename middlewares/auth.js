const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { SECRET_KEY } = process.env;
const HttpError = require("./HttpError");

const getCurrent = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authirized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      throw HttpError(401, "Not authirized");
    }
    req.user = user;
    next();
  } catch (err) {
    if (err.message === "Invalid signature") {
      err.status = 401;
    }
    next(err);
  }
};

module.exports = getCurrent;
