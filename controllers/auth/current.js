const { HttpErrors } = require("../../helpers");
const {User}=require('../../models/user')
const current=async(req, res, next)=>{
    const {_id:id}=req.user;
    const user=await User.findById(id).exec()
    if(!user){
        throw HttpErrors(401, 'Not authorized')
    }
    res.json({
        status:'success',
        code:200,
        user:{
            email: user.email,
            subscription: user.subscription
          }
    })
}

module.exports=current