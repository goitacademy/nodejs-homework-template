const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = process.env;

const auth = async(req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
        return res.status(401).send("Unauthorization");
    }

    try {
        const { id } = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(id).exec();

        if (!user || !user.token || user.token !== token) {
            return res.status(401).send("Unauthorization");
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).send("Unauthorization");
    }
};

module.exports = auth;