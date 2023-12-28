const HttpError = require("../helpers/HttpError");
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const { User } = require("../models/user");

const authenticate = async (req, res, next) => {
    try {
        const { authorization = "" } = req.headers;
        const [bearer, token] = authorization.split(" ");

        if (bearer !== "Bearer") {
            console.error('Invalid Bearer');
            return next(HttpError(401));
        }

        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);

        if (!user || !user.token || user.token !== token) {
            return next(HttpError(401, "User not found"));
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication Error:', error);
        next(HttpError(401));
    }
};

module.exports = authenticate;