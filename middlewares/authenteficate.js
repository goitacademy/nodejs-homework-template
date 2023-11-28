const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { UserServices } = require("../services");

const { SECRET_KEY } = process.env;

const authenteficate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }

  if (!token) {
    next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await UserServices.findUserById(id);
    if (!user || !user.token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = authenteficate;
