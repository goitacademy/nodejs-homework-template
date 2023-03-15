const UserSchema = require('../../models/userSchema')

const logoutServices=async(id)=>{
    const token = null;
    const user = await UserSchema.findOneAndUpdate({_id:id}, { $set: { token } });
    if(!user){
        throw new NotAutorisate (`Not authorized`)
}
return user
}
module.exports=logoutServices