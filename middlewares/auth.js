const { Unauthorized } = require("http-errors");
const jwt = require('jsonwebtoken');
const { User } = require('../models');  

const { REFRESH_SECRET_KEY } = process.env;

const auth = (arr) => {
    return async (req, res, next) => {
        const { cookie = "" } = req.headers;
        const [refreshToken, token] = cookie.split("=");
        try {
            if (refreshToken !== "refreshToken" || !token) {
                throw new Unauthorized('Not authorized');
            };
            const { id, role } = jwt.verify(token, REFRESH_SECRET_KEY);
            const user = await User.findById(id);
            if (!user || !user.token) {
                throw new Unauthorized('Not authorized');
            }
            if (!arr.includes(role)) {
                throw new Unauthorized('User with such role can not use this service');
            }
            req.user = user;
            next();
        } catch (error) {
            if (error.message === "Invalid signature") {
                error.status = 401;
            }
            next(error);
        }
    };
};

module.exports = auth;
