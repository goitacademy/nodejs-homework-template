const {User} = require("../models");
const jwt = require("jsonwebtoken");

const createError = require('http-errors');

// извлекаем заголовок авторизации
// разделяем на 2 части с помощью split
// проверяем bearer если не равен то нет авторизвции
// если все ок то проверяем token на валидность

const auth = async (req, res, next) => {

    const {authorization = ""} = req.headers;

    const [bearer, token] = authorization.split(" ");

    try {
        if (bearer !== "Bearer") {
            return res.json({message: "Not authorized"});
        }
        const {id} = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findById(id);


        if (!user || !user.token) {
            throw createError(401, "Not authorized");
        }
        req.user = user;
        next();
    } catch (error) {
        if (error.message === 'Invalid sugnature') {
            error.status = 401;
        }
        next(error);
    }
}


module.exports = auth;