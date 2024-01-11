const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  console.log(bearer);
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    //* Перевіряємо чи є людина в базі
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }

    req.user = user; //* До обєкту Реквест додаємо ключ `user`, яке буде = користувачу, який ми знайшли по `id`
    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = authenticate;
