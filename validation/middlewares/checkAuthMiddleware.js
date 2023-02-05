const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const createError = require("../../helpers/createError");

require("dotenv").config();

async function checkAuth(req, _, next) {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      throw createError(401, "Not authorized");
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(id);

    if (!user || !user.token || token !== user.token) {
      throw createError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    error.status = 401;
    error.message = "Not authorized";
    next(error);
  }
}

module.exports = checkAuth;
