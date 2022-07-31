const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {User, schemas}=require('../../models/user');
const {createError}=require('../../helpers');

const {SECRET_KEY}=process.env;

const login=async(req,res)=>{
    const {error}=schemas.login.validate(req.body);
    if(error){
        throw createError(400, error.message);
    }
    const {email, password}=req.body;
    const result=await User.findOne({email});
    if (!result ){
        throw createError(401, 'Email or password is wrong')
    }
    const comparePassword=await bcrypt.compare(password, result.password);
    if(!comparePassword){
        throw createError(401,'Email or password is wrong')
    }
     
    const payload={
        id:result._id
    };
    
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn:"24h"});
    await User.findByIdAndUpdate(result._id, {token}); 
    res.status(200).json({
        token,
        user:{
            email:result.email,
            subscription:result.subscription
        }
    })
}

module.exports=login