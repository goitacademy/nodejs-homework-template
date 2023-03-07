const UserSchema = require("../../models/userSchema");
require("dotenv").config();

const currentUser = async(req,res,next)=>{
    try{
        const { _id: id } = req.user;
        const user = await UserSchema.findOne({id} ).select({
       
            email: 1,
       subscription: 1,
       _id: 0,
     });
     res.status(200).json({
       status: "OK",
       code: 200,
       user: {
         email: user.email,
         token: token,
       },
     });
     if(!user){
       res.status(401).json({
         status: "Unauthorized",
         code: 401,
         data: { message: `Not authorized` },
       });
     } 
     
     
     }catch (err) {
       next(err);
     }
     }  
module.exports=currentUser