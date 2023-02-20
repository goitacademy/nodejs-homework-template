const jwt = require("jsonwebtoken");
require("dotenv").config();
const { RequestError } = require("../helpers");
const { User } = require("../models");

const { JWT_SECRET_KEY } = process.env;

const checkJwt = async (req, _, next) => {
    const [bearer, token] = req.headers.authorization?.split(" ") ?? [];

    try {
        if (bearer !== "Bearer") {
            throw RequestError(401);
        }
        const { id } = jwt.verify(token, JWT_SECRET_KEY);
        const user = await User.findById(id);

        if (!user || user.token !== token) {
            throw RequestError(401);
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.message === "invalid signature" || error.message === "jwt expired") {
            error.status = 401;
        }

        next(error);
    }
};

module.exports = checkJwt;
