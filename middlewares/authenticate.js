const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { HttpError } = require('../helpers');
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers; // присвоюємо значення за замовчуванням, т.к. може бути underfine, а з нього split не візьмеш
    const [bearer, token] = authorization.split(" ");

    // Якщо в заголовку Authorization перше слово не Bearer
    if (bearer !== "Bearer") {
        next(HttpError(401)); // помилка 401 перериває функцію, і далі вона не піде
    }

    try {
        const { id } = jwt.verify(token, SECRET_KEY); // метод jwt.verify викидає помилку, тому загортаємо в try/catch
        const user = await User.findById(id);

        // Якщо такого користувача нема в БД або у нього немає токену або його токен не співпадає з тим, який прислали
        if (!user || !user.token || user.token !== token) {
            next(HttpError(401));
        }

        req.user = user;  // додаємо користуваа, якого знайшли (хто відправив токен)
        next(); // якщо токен валідний і такий користувач є в БД
    } catch { // якщо токен не валідний
        next(HttpError(401));
    }
}

module.exports = authenticate;