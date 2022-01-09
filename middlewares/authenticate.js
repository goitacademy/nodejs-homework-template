const jwt = require("jsonwebtoken");
const { Unauthorized, NotFound } = require("http-errors");
const { User } = require("../models");
require("dotenv").config();
const { SECRET_KEY } = process.env;

/*
1. Извлекаем заголовок authorization.
2. Превращаем строку в массив по пробелу.
3. Проверяем, является ли первое слово "Bearer".
4. Проверяем токен на валидность (мы ли его выдали).
5. Находим в базе пользователя по id из токена.
6. Прикрепляем его к запросу (объект req).
7. Передаем обработку запроса дальше.
*/

const authenticate = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user) {
        throw new NotFound("User not found");
      }
      if (!user.token) {
        throw new Unauthorized("Not authorized");
      }
      req.user = user;
      next();
    } catch (error) {
      throw new Unauthorized(error.message);
    }
  } catch (error) {
    next(error);
  }
};
module.exports = authenticate;
