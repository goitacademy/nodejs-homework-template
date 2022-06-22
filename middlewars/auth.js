/*
Извлекает токен из заголовка и:
1 проверяет его  валидность  и не закончился ли он
2 извлекает из токена id и нахолит пользователя в базе по id и прикрепляет его  к запросу (req.user)
*/

/*
1 извлечь из заголовка запроса содержимое заголовка Authtorization.
2 разделить его на два слова: Beare and token 
3 проверить  равно ли первое слово "Bearer"
4проверить валидность второго слова token 
5 если token валиден извлечь из него  id  и найти пользователя в базе 
с таким id
6 если пользователя с таким id  нашли вбазе его нужно прикрепить  к запрсоу (req) 
*/

const { User } = require("../models");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  try {
    if (bearer !== "Bearer") {
      throw createError(401, "Not authorization");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw createError(401, "Not athorization");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === " Invalid signature") {
      error.status = 401;
    }

    next(error);
  }
};

module.exports = auth;
