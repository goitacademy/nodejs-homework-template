const jwt = require("jsonwebtoken");

const {User} = require("../models/user");

const {HttpError} = require("../helpers");

const {SECRET_KEY} = process.env;

const authenticate = async (req, res, next) => {
    const {authorization = ""} = req.headers; // default - "", інакше - undefined і "бекенд впаде" на split()
    const [bearer, token] = authorization.split(" ");
    if(bearer !== "Bearer") {
        next(HttpError(401));
    }
    try {
        const {id} = jwt.verify(token, SECRET_KEY);
         // перевірка чи є user в базі
        const user = await User.findById(id); 
        if(!user || !user.token || user.token !== token) {
            next(HttpError(401)); 
        }
        req.user = user;
        next();
    }
    catch {
        next(HttpError(401));
    }
};

module.exports = authenticate;