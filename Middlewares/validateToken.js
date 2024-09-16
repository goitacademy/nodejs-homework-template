const { User } = require("../Service/schemas/users");

const HttpError = require("../Helpers/HttpError");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const validateToken = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized bearer"));
  }
  try {
      const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById({ _id: id });
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Not authorized"));
    }

    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Not autorized"));
  }
};
module.exports = validateToken;
