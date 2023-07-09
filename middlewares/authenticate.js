const {RequestError} = require("../helpers");
const jwt = require("jsonwebtoken");

const {SECRET_KEY} = process.env;

const {User} = require("../models")


const authenticate = async (req,res,next) =>{

    const {authorization=""} = req.headers;
    
// const {bearer,token} =
//  authorization.split(" ");
const splited = authorization.split(" ");
const bearer = splited[0];
const token = splited[1];

 if (bearer !== "Bearer") {
    
   next(RequestError(401)) 
 };
 try {
    const {id} = jwt.verify(token,SECRET_KEY);
    const user = await User.findById(id);
    
    if (!user) {
        next(RequestError(401)) ;
    }
    req.user=user;
    next()
  
 } catch  {
    next(RequestError(401))  
 }
};

module.exports = authenticate;