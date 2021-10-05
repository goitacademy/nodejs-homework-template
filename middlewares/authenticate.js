// Мидлвар берет токен из заголовков Authorization, проверяет токен на валидность.
// В случае ошибки вернуть Ошибку Unauthorized.
// Если валидация прошла успешно, получить из токена id пользователя. Найти пользователя в базе данных по этому id.
// Если пользователь существует и токен совпадает с тем, что находится в базе, записать его данные в req.user и вызвать методnext().
// Если пользователя с таким id не существует или токены не совпадают, вернуть Ошибку Unauthorized
//для приватного раут

const jwt = require("jsonwebtoken");

const { User } = require("../models");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    res.status(401).json({
      status: "error",
      code: 401,
      message: "Not authorized",
    });
    return;
  }
  //разделяем н два слова - bearer, token
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    res.status(401).json({
      status: "error",
      code: 401,
      message: "Not authorized",
    });
    return;
  }

  try {
    //разшифровываем токен в котором _id находится
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(_id);
    if (!user.token) {
      res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
      });
      return;
    }
    req.user = user; //добавляем свойство user в req.user
    next();
  } catch (error) {
    res.status(401).json({
      status: "error",
      code: 401,
      message: "Not authorized",
    });
    return;
  }
};

module.exports = authenticate;
