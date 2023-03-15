const jwt=require('jsonwebtoken');
const {UnauthorizedError}=require('../helpers/errors')
require("dotenv").config();


const authNewMiddlware=async(req,res,next)=>{
const [tokenType, token] = req.headers['authorization'].split(' ')
// console.log(tokenType, token)
if(!token){
    next(new UnauthorizedError('please, provide a token'))
}
try{
const user= jwt.decode(token, process.env.SECRET)
req.token=token;
req.user =user;
next()
}catch(err){
next(new UnauthorizedError('please, provide a token'))
}

}
module.exports=authNewMiddlware