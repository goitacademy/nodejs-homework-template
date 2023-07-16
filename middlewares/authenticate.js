const jwt = require("jsonwebtoken");

const {User} = require("../models/user");

const { SECRET_KEY } = process.env;

const {HttpError, ctrlWrapper} = require("../../helpers");

const authenticate = async (req, res, next) => {
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    
    try {
        if (bearer !== "Bearer") {
            next(HttpError(401))
        }
        
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if(!user || !user.token || user.token !== token) {
            next(HttpError(401));
        }
        req.user = user;

        next();
    } 
    catch (error) {
        next(HttpError(401));
    }
}

module.exports = authenticate;