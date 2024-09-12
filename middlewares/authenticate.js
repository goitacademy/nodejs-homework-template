const jwt=require('jsonwebtoken');
const UserSchema =require('../models/userSchema')
const {UnauthorizedError}=require('../helpers/errors')
require("dotenv").config();
const secret = process.env.SECRET

const authenticate=(req,res,next)=>{
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
  module.exports=authenticate


// const authenticate=async(req,res,next)=>{
// const [bearer, token] = req.headers['authorization'].split(' ')
//  console.log('bearer',bearer,'token', token)
// if (bearer !== "Bearer") {
//     next(UnauthorizedError('barer false'));
//   }

// // if(!token){
// //     next(new UnauthorizedError('please, provide a token'))
// // }
// try{
// const { id } = jwt.verify(token, secret);
// const userId = await UserSchema.findById(id);
// if (!userId || !userId.token || userId.token !== token) {
//     next(UnauthorizedError('please, try again'));
//   }

// // const user= jwt.decode(token, process.env.SECRET)
// // req.token=token;
// req.user =user;
// next()
// }catch(err){
// next(new UnauthorizedError('please, provide a token'))
// }

// }
// module.exports=authenticate