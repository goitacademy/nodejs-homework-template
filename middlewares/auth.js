const { userModel } = require("../models/user");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const getCurrent = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") throw createError(401, "Not authorized");
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await userModel.findById(id);
    if (!user || !user.token) throw createError(401, "Not authorized");
    req.user = user;
    next();
  } catch (error) {
    if (
      error.message === "invalid signature" ||
      error.message === "jwt must be provided" ||
      error.message === "jwt malformed" ||
      error.message === "invalid token"
    ) {
      error.status = 401;
      error.message = "Not authorized";
    }
    if (error.message === "jwt expired") {
      error.status = 408;
      error.message = "Time's out, please login again";
    }
    next(error);
  }
};

module.exports = getCurrent;
