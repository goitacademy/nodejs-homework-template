const {HttpError} = require("../helpers");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const User = require("../models/user");

dotenv.config()

const authenticate = async (req, res, next) => {
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");

    if(bearer !== "Bearer") {
        next(HttpError(401, "Not authorized"));
    }

    try {
        const {id} = jwt.verify(token, process.env.SECRET_KEY);

        
        const user = await User.findById(id);
        

        if(!user || !user.token || user.token !== token) {
            next(HttpError(401, "Not authorized")); 
        }

        req.user = user;
        next();
    }
    catch {
        next(HttpError(401, "Not authorized"));
    }
}

module.exports = authenticate;