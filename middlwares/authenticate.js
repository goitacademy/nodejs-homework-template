const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const newHttpError = require("../helpers/HttpError");

const { User } = require("../models/user");

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(newHttpError(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      next(newHttpError(402, "Not authorized"));
    }
    next();
  } catch (error) {
    next(newHttpError(403, "Not authorized"));
  }
};

module.exports = authenticate;
