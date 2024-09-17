const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { SECRET } = process.env;

const auth = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const [bearer, token] = authorization.split(" ");

        if (bearer !== "Bearer") {
            throw new Error("Not Authorized");
        }

        const { id } = jwt.verify(token, SECRET);
        const user = await User.findById(id);

        if (!user || user.token !== token || !user.token) {
            throw new Error("Not Authorized");
        }
        req.user = user;
        next();

    } catch (error) {
        next(error);
    }
};

module.exports = auth;