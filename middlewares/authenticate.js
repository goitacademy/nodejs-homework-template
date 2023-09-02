const jwt = require("jsonwebtoken");

const user = require("../models/users.js");
const errorMessage = require("../helpers/errorMessage");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(errorMessage(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const result = await user.findById(id);

    if (!result || !result.token || result.token !== token) {
      next(errorMessage(401, "Not authorized"));
    }
    req.user = result;
    next();
  } catch {
    next(errorMessage(401, "Not authorized"));
  }
};

module.exports = authenticate;
