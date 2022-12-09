const { User } = require("../models");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  // делаем деструктуризацию на сплитную строку

  try {
    if (bearer !== "Bearer" || !token) {
      throw createError(401, "Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    // у нас в jwt.sign зашит payload ={id: user._id}
    const user = await User.findOne({ _id: id });
    if (!user || !user.token) {
      throw createError(401, "Not authorized");
    }

    req.user = user;
    //   прикрепляем нашего пользовалетя к объекту запроса
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;

/*
1) извлекает токен из заголовка 
2) проверяет валидность токена (лже или протухший токен не допустим)
3) извлекает из токена id, находит пользователя по id в базе и прикрепляет его к запросу (req.user)
*/

/*
- из заголовков отлавливает заголовок авторизации Authorization
- содержимое разделить на две части Bearer + токен
- проверить первое слово, равно ли оно Bearer 
- проверить второе слово, валидный ли токен (через jwt.verify(token, secretOrPublicKey, [options, callback]) 
- если токен валиден - извлечь из него id, найти в базе пользователя с таким id
- если пользователь найден - крепим его к запросу (req.user)
*/
