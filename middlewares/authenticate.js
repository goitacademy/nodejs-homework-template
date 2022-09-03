const { User } = require("../models");
const { SECRET_KEY } = require("../helpers/evn");
const jwt = require ("jsonwebtoken")

const authError = {
    status: "Unauthorized",
    code: 401,
    massage: "Not authorized",
};

const authenticate = async (req, res) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    try {
        if (bearer !== "Bearer" || !token) {
            res.status(401).json(authError);
            return;
        }

        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);

        if (!user || !user.token) {
            res.status(401).json(authError);
            return;
        }

        req.user = user;
        next();
    } catch (err) {
        if (err.message === "Invalid signature") {
            err.status = 401;
        }
        next(err);
    }
};

module.exports = authenticate;