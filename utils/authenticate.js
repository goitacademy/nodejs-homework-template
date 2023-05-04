const jwt = require("jsonwebtoken");

const { User } = require("../models/contacts/users");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        next(res.status(401).json({
            message: "Not authorized"
        }));
        return;
    }

    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token) {
            next(res.status(401).json({
                message: "Not authorized"
            }));
            return;
        }
        req.user = user;
        next();
    }
    catch {
        next(res.status(401).json({
            message: "Not authorized"
        }));
    }
}

module.exports = authenticate;