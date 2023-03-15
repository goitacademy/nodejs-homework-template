const UserSchema = require('../../models/userSchema')
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const{ValidationJoiError,NotAutorisate }=require('../../helpers/errors')
require("dotenv").config();
const secret = process.env.SECRET


 const loginServices= async(email,password)=>{
     const user = await UserSchema.findOne({ email });
//      console.log('user',user._id)
        //   const { _id: id } = user;
    if (!user){
         throw new ValidationJoiError(`Incorrect user with ${email}`)  
     }
// //     if (!user || !user.validPassword(password)) {
// //     throw new ValidationJoiError('Incorrect login or password')
// // }
if (!await bcryptjs.compare(password, user.password)){
throw new NotAutorisate ('wrong password')
}
 const token = jwt.sign( {_id:user._id,createdAt:user.createdAt} , secret, { expiresIn: "3h" });
 return token
 }
 module.exports= loginServices
