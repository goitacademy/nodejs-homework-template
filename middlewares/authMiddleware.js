const jwt = require("jsonwebtoken");
const {NotAutorizedError} = require("../helpers/errors");

const authMiddleware = (req,res,next) => {
    try { 
        const [, token] = req.headers.authorization.split(' ');
    
     if (!token){
        next(new NotAutorizedError("Please provide token"))
    }
    
        const user = jwt.decode(token,process.env.JWT_SECRET);
        req.user = user;
        req.token = token;        
        next();
    }catch(e){
        next(new NotAutorizedError("Invalid token"))
    }    
    
}

module.exports = {authMiddleware}