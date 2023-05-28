const jwt = require("jsonwebtoken");
const {User} = require("../models/user")
const {HttpError} = require("../helpers");
const { SECRET_KEY } = require("../config");

const authenticate = async (req, res, next) => {
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    if(bearer !== "Bearer") {
        next(new HttpError(401));
    }
    try{
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if(!user || !user.token || user.token !== token){
            next(new HttpError(401));
        }
        req.user = user
        next();
    }
    catch{
        next(new HttpError(401)) 
    }

};

module.exports = authenticate