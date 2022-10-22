const jwt = require("jsonwebtoken");
const { findByIdUser } = require("../servisce/");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
  //* данні з headers
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  //* Перевірка типу токено та його наявність
  if (bearer !== "Bearer" || token === "") {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  try {
    //* запитуємо id з payload  токену
    const { id } = jwt.verify(token, SECRET_KEY);
    //* Шукаємо користувача з id в базі данних
    const user = await findByIdUser({ id });
    //* Перевіряємо наявн користувача, або стан логінізації
    if (!user || !user.token) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    //* Записуєм  данні юзера
    req.user = {
      id: user._id,
      subscription: user.subscription,
      email: user.email,
    };

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = auth;
