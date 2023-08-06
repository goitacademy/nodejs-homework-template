const jwt = require("jsonwebtoken");
const { setApiErrorStatus } = require("../helpers");
const { authService } = require("../services");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  if (!authorization) {
    next(setApiErrorStatus(401, "No data for authorization"));
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(setApiErrorStatus(401, "No correct bearer type"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await authService.getUserById(id);

    if (!user || !user.token) {
      next(setApiErrorStatus(401, "Not authorized"));
    }

    req.user = user;
    next();
  } catch {
    next(setApiErrorStatus(401, "Not authorized"));
  }
};

module.exports = authenticate;