const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { createError } = require("../helpers");

/*
1. Извлечь из заголовков запроса заголовок authorization.
2. Разделить его на 2 слова.
3. Проверить, равно ли первое слово "Bearer".
3.1. Если нет - отправить 401 ответ.
4. Проверить, валиден ли токен.
4.1. Если нет - отправить 401 ответ.
5. Проверить, есть ли в базе пользователь с таким id.
5.1. Если нет - отправить 401 ответ.
6. Добавить в объект request найденного пользователя:
req.user = user;
7. Передать обработку дальше.
*/

const { SECRET_KEY } = process.env;

const autentificate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw createError(401, "Not authorized");
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw createError(401, "Not authorized");
      }
      req.user = user;
      next();
    } catch (error) {
      throw createError(401, "Not authorized");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = autentificate;
