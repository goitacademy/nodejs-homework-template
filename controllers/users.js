const {User,authSchemas} =require("../models");

const { RequestError } = require("../helpers");


const register = async (req, res, next) => {
    try {
        // const {email} = req.body;
        // const user = await User.findOne({email})
        // if (user) {
        //    throw RequestError(409,"Email in use") 
        // }
        const { error } = authSchemas.registerSchema
        .validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
      const newUser = await User.create(req.body);
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


  module.exports= {
    register,
  }