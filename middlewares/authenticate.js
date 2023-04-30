const jwt = require("jsonwebtoken");

const{ User }= require("../models")
const {HttpError} = require("../helpers");

const authenticate = async(req, res, next)=>{
const {authorization = ""} = req.headers;
const [bearer, token] = authorization.split(" ");
if(bearer !== "bearer"){
next(HttpError(401));
}

try{
const {id} = jwt.verify(token, "secret");
const  user = await User.findById(id);
 if( !user || !user.token || user.token !== token){
    next(HttpError(401));
 }

 req.user = user;
 next();

} catch {
    next(HttpError(401));
}

console.log("authorization ====>", authorization);
console.log(" authorization(bearer) ====>", bearer);
console.log(" authorization (token)", token );
};

module.exports = authenticate;