const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const { HttpError } = require('../helpers');

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") { // перевіряємо чи перше слово Bearer
        next(HttpError(401))
    }
    // перевіримо токен на валідність
    try {
        const { Id } = jwt.verify(token, SECRET_KEY); // чи видавали токен і чи шифрували ми токен потрібним ключем
        const user = await User.findById(Id) // тут первыряємо чи э такий user с потрібним id
        if (!user || !user.token || user.token !== token) { // якщо користувача немає або немає токена в базі або не токен користувача
            next(HttpError(401))
        }
        req.user = user; // записуємо інформацію про того хто робить запит
        next()

    } catch {
        next(HttpError(401, "Not autorized"))
    }
}

module.exports = authenticate;
