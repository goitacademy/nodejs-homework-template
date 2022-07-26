const bcrypt=require('bcryptjs');
const {User, schemas}=require('../../models/user');
const {createError}=require('../../helpers');

const login=async(req,res)=>{
    const {error}=schemas.login.validate(req.body);
    if(error){
        throw createError(400, error.message);
    }
    const {email, password}=req.body;
    const result=await User.findOne({email});
    // const userEmail=user.email;
    // const userSubscription=user.subscription;
    if (!result){
        throw createError(401, 'Email wrong')
    }
    const comparePassword=await bcrypt.compare(password, result.password);
    if(!comparePassword){
        throw createError(401,'Password wrong')
    }
    const token="jhskfhlkf.sljslkdfj.98403kkd";
    
    res.status(200).json({
        token,
        user:{
            email:result.email,
            subscription:result.subscription
        }
    })
}

module.exports=login