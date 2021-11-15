const { Unauthorized, NotFound } = require("http-errors");
const jwt = require("jsonwebtoken");

const { User } = require("../model");

const { SECRET_KEY } = process.env;

/*
1. Извлекает заголовок authorization.
2. Превращает строку в массив по пробелу.
3. Проверяем, является ли первое слово "Bearer".
4. Проверяет токен на валидность (мы ли ео выдали).
5. Находим в базе пользователя по id из токена.
6. Прикрепляем его к запросу (объект req).
7. Передаем обработку запроса дальше. 
*/

const authenticate = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Unauthorized();
    }

    const [bearer, token] = req.headers.authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new Unauthorized();
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw new Unauthorized("User not found");
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
