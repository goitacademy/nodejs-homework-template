const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers; // для того чтобы при andefinde не упал код = ""
    // провер. содержит ли token первое слово Bearer
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        next(HttpError(401, "Not authorized"));
    }
    // поскольку jwt.verify выбрас. ошибку оборачиваем try/catch
    try {
        const { id } = jwt.verify(token, SECRET_KEY); // если token валид. возвр. payload (id), если не тот ключ или время жизни закончилось => 401
        const user = await User.findById(id); // проверка наличия польз. в базе
        if (!user || !user.token || user.token !== token) {
            next(HttpError(401, "Not authorized"));
        }
        req.user = user; // в req додаємо інформацію про те хто робить запит і тому контроллер(controllers) має інф. хто робить запит
        next();
    }
    catch {
        next(HttpError(401), "Not autorized");
    }
};

module.exports = authenticate;