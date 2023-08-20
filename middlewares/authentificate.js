// міделвара яка перевіряє: наявність заголовка, наявність у заголовку Bearer, наявність токена та валідність токена
const jwt = require("jsonwebtoken");

const { HttpError } = require("../helpers");
const User = require("../models/user"); // імпорт функції моделі

const { SECRET_KEY } = process.env;

const authentificate = async (req, res, next) => {
  const { authorization = "" } = req.headers; // витягуємо значення поля authorization з заголовка
  const [bearer, token] = authorization.split(" "); // розділяємо на масив строк по пробілу

  //   проводимо перевірку чи дорівнює перший елемент розділеного масиву строк слову Bearer, якщо ні виводимо помилку
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }
  try {
    // перевіряємо справжність токена за допомогою секретного ключа. Якщо токен не валідний повртається помилка, якщо валідний повертається payload в которого ми забираємо id
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id); // перевіряємо чи існує в базі користувач з таким токеном

    // Якщо користувача в базі не має, або відсутній токен або токен не співпадає, створюєmo об'єкт HttpError з кодом помилки 401 і повідомленням про помилку
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "User not found"));
    }
    req.user = user; // зберігаємо інформацію про користувача який зробив запит

    next(); // Продовження обробки запиту
  } catch {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = authentificate;
