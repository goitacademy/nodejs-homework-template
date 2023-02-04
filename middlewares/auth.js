/* 
1. Извлекает токен из заголовка
2. Проверяет валидность токена (не "протух")
3. Извлекате из токена ИД, находит пользователя по ИД и прикрепляет к запросу (req.user) 
*/

/*
1. извлечь из  запроса содержимое заголовка Autorization
2. разделить его на 2 части: Bearer token
3. проверить равно ли первое слово = "Bearer"
4. проверить валидность токена
5. Если токен валиден - извечь из него ИД и найти пользователя
6. Если нашли пользователя - прикрепить к запросу (req)
*/

const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = " " } = req.headers;
  const [bearer, token] = authorization.split(" ");
  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized(`Not authorized`);
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new Unauthorized(`Not autorized`);
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === `Invalid sugnature`) {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = { auth };
