const jwt=require('jsonwebtoken');
const User=require('../models/User')
const {HttpError}= require('../helpers/HttpError');




const authenticate = async (req, res, next) => {
const {authorization}=req.headers;
if (!authorization) {
    return next(HttpError(401, 'Not authorized'));
  }
const [bearer, token]=authorization.split(" ");
if(bearer !== "Bearer"){
    return next(HttpError(401, 'Not authorized'));
}
try{
    const {id}=jwt.verify(token, process.env.JWT_SECRET);
    const user= await User.findById(id)

    if (!user  || !user.token || user.token !== token) {
        return next(HttpError(401, 'Not authorized'));
      }
  
      req.user = user;
      next();
}  catch (error) {
    return next(HttpError(401, 'Not authorized'));
  }
}



module.exports={
    authenticate}