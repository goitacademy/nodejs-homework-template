const UserSchema = require("../../models/userSchema");
require("dotenv").config();


const logout = async(req,res,next)=>{
    try {
         const { _id: id } = req.params;
        const token = null;
        const user = await UserSchema.findOneAndUpdate({id }, { $set: { token } });
  if(!user){
    res.status(401).json({
      status: "Unauthorized",
      code: 401,
      data: { message: `Not authorized` },
    });
  }
    return user
      }catch (err) {
        next(err);
      }
}
module.exports=logout