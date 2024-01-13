const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { HttpError } = require("../helpers/index");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  console.log("bearer", bearer);
  console.log("token", token);


  if (bearer !== "Bearer") {
    next(HttpError(401)); //Неверный формат авторизации
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401)); //Пользователь не найден
    }
    req.user = user;
    // console.log("req.user", req.user);
    next();
  } catch (error) {
    next(HttpError(401)); //Неверный токен
  }
};

module.exports = authenticate;
