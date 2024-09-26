const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const autenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    // next с аргументом обрывает функцию

    next(HttpError(401));
  }

  // jwt verify выкидвает ошибку, по этому try catch
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }

    //записываем юзера в обьект
    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = autenticate;
