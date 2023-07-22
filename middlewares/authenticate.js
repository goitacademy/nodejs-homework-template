const jwt = require("jsonwebtoken");
const {User} = require("../models/user");
const { HttpError } = require("../utils");
const {SECRET_KEY} = process.env;

const authenticate = async (req, res, next) => {
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== 'Bearer' || !token) {
        next(HttpError(401, "No token"));
    };
    try {
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if(!user || !user.token || user.token !== token) {
            next(HttpError(401, "Wrong token"));
        };
        req.user = user;
        next();
    } catch(error) {
        next(HttpError(401));
    }; 
};

module.exports = authenticate;