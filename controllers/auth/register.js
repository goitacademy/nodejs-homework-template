const {User} = require("../../models");
const Joi = require('joi');
const bcrypt =require("bcryptjs");

const register = async(req,res) => {
  console.log("register worked")
  const {email, password} = req.body;
  const user = await User.findOne({email});

  console.log("user", user)
  if (user != null){
    res.status(409).json({
      "status": 409,
      "message": "Email in use"
    })
  }

  if(!email || !password){
    res.status(400).json({
      code: 404,
      message:"missing fields",
    })
  } else {
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({email, password: hashPassword});
    
    const joiShema = Joi.object({
      _id: Joi.required(),
      password: Joi.string().min(6).required(),
      email: Joi.string().required(),
      subscription: Joi.string().required(),

      createdAt: Joi.date(),
      updatedAt: Joi.date()
  
  })

  const {error, value} = joiShema.validate(result.toObject());
  
  if (error) {
    console.log(error.message)
  }

  if (!error && value){
    res.status(201).json({
      status: 'success',
      code: 201,
      user:{
        "email" : result.email,
        "password": result.password,
        "subscription": result.subscription
      }
  })} else {
    const errorMsg = error.message

    res.status(400).json({
      status: 'success',
      code: 400,
      error: errorMsg
      });
    }
  }
}

module.exports = register;