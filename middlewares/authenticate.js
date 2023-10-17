const HttpError = require("../helpers/HttpError.js");
const ctrlWrapper = require('../decorators/ctrlWrapper.js');
const jwt = require("jsonwebtoken");
const { User } = require('../models/User.js')

require("dotenv").config();
const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization = " "} = req.headers;
    const [bearer, token] = authorization.split(" ")
    if (bearer !== "Bearer") {
        throw HttpError(401, "Not authorized");
    }

    try {
        const { id } = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(id);
        if (!user || !user.token) {
            throw HttpError(401, "Not authorized");
        }
    
        req.user = user;
        next();
    }
    catch (error) {
        next(HttpError(401, "Not authorized"));
    }
}

module.exports = ctrlWrapper(authenticate)
