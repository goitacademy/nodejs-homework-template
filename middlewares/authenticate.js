const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const { HttpError } = require('../helpers');

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        next(HttpError(401))
    }
    try {
        const { Id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(Id)
        if (!user) {
            next(HttpError(401))
        }
        next()

    } catch {
        next(HttpError(401, "Not autorized"))
    }
}

module.exports = authenticate;
