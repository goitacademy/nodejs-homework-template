
const jwt = require("jsonwebtoken");
const {HttpError} = require("../helpers");

const {SECRET_KEY} = process.env;
const {User} = require("../models/users");

const authenticate = async (req, res, next) => {
    const {authorization} = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        next(HttpError(401));
    }
    try{
     const {id} = jwt.verify(token, SECRET_KEY);
     const user = await User.findById(id);
     if (!user || !user.token|| user.tokenn !== token){
        next(HttpError(401));
     }
     req.user = user;
     next()
    }
    catch{
        next(HttpError(401));
    }
}

module.exports = authenticate;