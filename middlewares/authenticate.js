const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const UserModel = require("../models/modelUsers");

const { SECRET_KYE } = process.env;

const autenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized1"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KYE);
    const user = await UserModel.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Not authorized2"));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Not authorized3"));
  }
};

module.exports = autenticate;
