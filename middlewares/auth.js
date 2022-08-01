const jwt = require("jsonwebtoken");

const {User} = require("../models/user");

const {createError} = require("../helpers");

const {SECRET_KEY} = process.env;

const auth = async (req, _, next) => {
    const {authorization=""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    if(bearer !== "Bearer"){
        next(createError(401, "Not authorized"));
    }
    try{
       const {id} = jwt.verify(token, SECRET_KEY);
       const user = await User.findById(id);
       if(!user||!user.token){
        next(createError(401,"Not authorized"));
       }
       req.user = user;
       next()
    } catch (err){
        next(createError(401, err.message));
    }
}

module.exports = auth;