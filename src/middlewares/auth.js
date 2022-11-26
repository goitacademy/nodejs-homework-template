const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
require('dotenv').config();
const { SECRET_KEY } = process.env;

async function auth(req, res, next) {
    const authHeader = req.headers.authorization || "";
    const [tokenType, token] = authHeader.split(" ");

    if (!token) {
        next(new Unauthorized('Please, provide token'))
    }

    if (tokenType === "Bearer" && token) {
        try {
            const verifiedToken = jwt.verify(token, SECRET_KEY);
            console.log("token is valid", verifiedToken);

            const user = await User.findById(verifiedToken._id);
            if (!user) {
                next(new Unauthorized("No user with such id"));
            }

            if (!user.token) {
                next(new Unauthorized("token is invalid"));
            }

            req.user = user;
            req.token = token;

            return next();
        } catch (error) {
            return next(new Unauthorized("No token"));
        }
    }
}

module.exports = {
    auth,
};