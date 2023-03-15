// const UserSchema = require("../../models/userSchema");
// require("dotenv").config();
const logoutServices =require('../../services/authServise/logoutServices')

const logout = async(req,res,next)=>{
    try {
      const { contactId } = req.params;
        const user =logoutServices(contactId)
        // const token = null;
        // const user = await UserSchema.findOneAndUpdate({id }, { $set: { token } });
        res.status(200).json({
          status: "OK",
          code: 200,
         message:`sucsess logout`
        
        });
        return user
      }catch (err) {
        next(err);
      }
}
module.exports=logout