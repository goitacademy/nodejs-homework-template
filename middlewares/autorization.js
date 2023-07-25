const service = require("../service");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const authorization = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(service.CreateError(401, "Not authorization"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(service.CreateError(401, "Not authorization"));
    }
    req.user = user;
    next();
  } catch {
    next(service.CreateError(401, "Not authorization"));
  }
};
module.exports = authorization;
