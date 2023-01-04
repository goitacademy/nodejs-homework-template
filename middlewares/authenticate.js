const { HttpError } = require("../helpers");
const { JWT_SECRET } = process.env;
const { User } = require("../models/users");

const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    console.log(authorization)
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
        next(HttpError(401, "Not authorized"));
    }

    try {
        const { id } = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(id);
        if (!user || !user.token) {
            next(HttpError(401, "Not authorized"));
        }
        req.user = user;
        next()
    }
    catch(error) {
        next(HttpError(401, "Not authorized"));
    }
}

module.exports = authenticate;