const jwt = require("jsonwebtoken");
require("dotenv").config();
const { HttpError } = require("../helpers");
const { User } = require("../models");

const { SECRET_KEY } = process.env;

const authenticate = async (req, _, next) => {
    const [bearer, token] = req.headers.authorization?.split(" ") ?? [];

    try {
        if (bearer !== "Bearer") {
            throw HttpError(401);
        }
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);

        if (!user || user.token !== token) {
            throw HttpError(401);
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

module.exports = authenticate;