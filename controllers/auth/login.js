const bcrypt = require("bcryptjs");
const {User}=require('../../models/user')
const jwt=require('jsonwebtoken')
const {HttpErrors}=require('../../helpers')
 const {SECRET_KEY}= process.env
const login=async(req, res, next)=>{
    const {password, email}=req.body;
    const user=await User.findOne({email}).exec()
    if(!user){
        throw HttpErrors(401, 'Email or password is wrong')
    }
    const passwordCompared=bcrypt.compareSync(password, user.password)
    if(!passwordCompared){
        throw HttpErrors(401, 'Email or password is wrong')
    }
    const payload={id:user._id}
    const token= jwt.sign(payload, SECRET_KEY, {expiresIn:'24h'})
    await User.findByIdAndUpdate(payload.id, {token})
    res.json({
        status:'success',
        code:200,
        token,
        user:{
            email: user.email,
            subscription: user.subscription
        }
    })
}


module.exports=login