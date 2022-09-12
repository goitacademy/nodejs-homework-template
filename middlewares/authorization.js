const { SECRET_KEY } = process.env;
const createError = require("../helpers/createError");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const authorize = async (req, res, next) => {
    try {
        const {authorization = ""} = req.headers;
        const [bearer, token] = authorization.split(" ");
        const {id} = jwt.verify(token, SECRET_KEY);  
        if(bearer !== "Bearer") {
            throw createError(401, "Not authorized")
        }
        try {
            const {id} = jwt.verify(token, SECRET_KEY);
            const user = await User.findById(id);
            if(!user || !user.token || user.token !== token) {
                throw createError(401, "Not authorized ssss")
            }
        
            req.user = user;
            next()
        } catch (error) {
            throw createError(401, "Not authorized")
        }
    } catch (error) {
        next(error);
    }
};

module.exports = authorize;