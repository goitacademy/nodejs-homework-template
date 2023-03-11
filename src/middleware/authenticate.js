const jwt = require("jsonwebtoken");
const { findUserById } = require("../services");
const { RequestError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw RequestError(401);
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await findUserById(id);

    if (!user || !user.token) {
      throw RequestError(401);
    }

    req.user = user;

    next();
  } catch (error) {
    if (!error.status) {
        error.status = 401;
        error.message = "Not authorized";
    }
    next(error);
  }
};

module.exports = authenticate;
