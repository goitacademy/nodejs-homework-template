const jwt = require("jsonwebtoken");
const RequestError = require("../helpers");
const { SECRET_KEY } = process.env;
const { User } = require("../models/userAuth");
const authentificate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(" ");
    // * Разделяем на слово Вearer и сам token

    if (bearer !== "Bearer") {
      throw RequestError(401);
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    // * id это дэструктурезированое свойство из "../controllers/login" = const payload = { id: user._id };

    const user = await User.findById(id);
    // * Проверки на наличие пользователя в базе по id

    if (!user || !user.token || user.token !== token) {
      throw RequestError(401);
    }
    req.user = user;
    // * Если token валидный, в req.user записываем всю информацию о пользователи который сделал запрос
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = "Unauthorized ";
    }
    next(error);
  }
};

module.exports = authentificate;
