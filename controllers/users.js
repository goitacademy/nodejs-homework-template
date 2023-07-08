const {User,authSchemas} =require("../models");
 
const bcrypt = require('bcryptjs');

const { RequestError } = require("../helpers");


const register = async (req, res, next) => {
    try {
        // const {email} = req.body;
        // const user = await User.findOne({email})
        // if (user) {
        //    throw RequestError(409,"Email in use") 
        // } 
        const {password} = req.body;
        const { error } = authSchemas.registerSchema
        .validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const hashPassword = await bcrypt.hash(password,10)
      const newUser = await User.create({...req.body,password:hashPassword});
    //   if (!newUser) {
    //     throw RequestError(404, "Not found");
    //   }
      res.status(201).json({
        email:newUser.email,
        subscription:newUser.subscription,
      });
    } catch (error) {
      next(error);
    }
  };


  const login = async (req, res, next) => {
    try {
        // const {email} = req.body;
        // const user = await User.findOne({email})
        // if (user) {
        //    throw RequestError(409,"Email in use") 
        // } 
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
          throw RequestError(401, "Email or password is wrong");
        };
        const passwordCompare = await bcrypt.compare(password,user.password);
        if (!passwordCompare) {
          throw RequestError(401, "Email or password is wrong");
        }

        const { error } = authSchemas.registerSchema
        .validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
     const token = "hjghgjgjh"
     res.json({token,user})
    } catch (error) {
      next(error);
    }
  };


  module.exports= {
    register,
    login,
  }