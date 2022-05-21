const Joi = require("joi");
const service = require("../service");
const bcrypt = require('bcryptjs');
 const jwt=require("jsonwebtoken");



const newUserValidation=(data)=>{
  const schema=Joi.object({
      email:Joi.string().min(2).max(255).required().email(),
      password:Joi.string().min(2).max(20).required(),
  })

  return schema.validate(data)
}

const signup = async (req, res) => {
   const {error}=newUserValidation(req.body)
    const { email,password } = req.body;
    const hashPass=async(password)=>{
        const hashPassword = await bcrypt.hash(password, 10);
        return hashPassword
    }

    if(!error){
      try {
        const result = await service.postNewUser( email,await hashPass(password));
     
        return res.status(201).json({
          user: {
            email: result.email,
            subscription: result.subscription,
          },
        });
      } catch (e) {
         return res.status(409).json({
            message:"Email in use"
          })
      }
    }
    res.status(400).json( {"message": "Ошибка от Joi или другой библиотеки валидации"});
  };

const login =async(req,res,next)=>{
  const {SECRET_KEY} = process.env;
  const {error}=newUserValidation(req.body)
  const { email,password } = req.body;
  if(!error){
    try {
      const result=await service.getUserByEmail(email)
      if(await bcrypt.compare(password, result.password)){
        const payload = {
          id: result._id
      } 
      const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "10h"});
      const findAndUpdate=await service.updateUserById(result._id, {token})
      return res.status(200).json({
          token: token,
          user:{
            email: findAndUpdate.email,
            subscription: findAndUpdate.subscription
          }
        })
        
      }
      return res.status(401).json({
        "message": "Email or password is wrong"
      })
    } catch (error) {
      return next(error)
    }
  }
  return res.status(400).json( {"message": "Ошибка от Joi или другой библиотеки валидации"});

}
const logout =async(req,res,next)=>{
  try {
    const {_id} = req.user;
    await service.updateUserById(_id, {token:""})
  return  res.status(204).json()
  } catch (error) {
    next(error)
  }

  return res.status(401).json({
  })

}
const current =async(req,res,next)=>{
  const {email, subscription}=(req.user);
  try {
    return res.status(200).json({
     email:email,
     subscription:subscription,
    })
  } catch (error) {
    next(error)
  }

}
  module.exports = {
    signup,
    login,
    logout,
    current
  };
  