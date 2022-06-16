const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { SECRET_KEY } = process.env;

// 1. Извлечь из заголовков запроса содержимое заголовка Authorization.
// 2. Разделить его на 2 слова: bearer и токен.
// 3. Проверить равно ли первое слово "Bearer".
// 4. Проверить валидность второго слова (токен).
// 5. Если токен валиден - извлечь из него id и найти пользователя в базе с таким id.
// 6. Если пользователя с таким id мы нашли в базе - его нужно прикрепить к запросу (объект req).

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = authMiddleware;
