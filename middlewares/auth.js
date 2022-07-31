const createError = require('../helpers/createError');
const {User} = require('../models/user');
const jwt = require('jsonwebtoken');
const {SECRET_KEY}=process.env;

const auth=async(req,res, next)=>{
    const{authorization=""}=req.headers;
    const [bearer, token]=authorization.split(" ");
    if(bearer !== "Bearer"){
        next (createError(401));
    }
    try {
        const {id}=jwt.verify(token, SECRET_KEY);
        const result= await User.findById(id);
        if(!result || !token){
            next (createError(401));
        }
        req.user=result;
        
        next();
    } catch (error) {
        next (createError(401, error.massege));
    }
}

module.exports=auth;