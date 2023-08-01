const jwt = require('jsonwebtoken');
const { HttpError } = require('../helpers');
const { User } = require('../models/user');

const {SECRET_KEY} = process.env;

// функция для проверки авторизации (по токену) 
// пользователя при запросах
const auth = async (req, res, next) => {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        console.log("No Bearer");
        next(HttpError(401))
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user) {
           next(HttpError(401)) 
        }
        req.user = user;
        next();
    } catch {
        console.log("token is invalid");
        next(HttpError(401))
    }

};

module.exports = auth;
