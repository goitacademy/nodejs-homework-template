const Joi = require('joi');
const { ValidationError}=require('../helpers/errors')

module.exports={
    postContactsValidation:(req, res, next)=>{
        const schema = Joi.object({
          name: Joi.string().min(3).max(15).required(),
          email: Joi.string().min(3).max(40).required().email().required(),
          phone: Joi.string().min(7).max(14).required(),
          })
          const validatResult=schema.validate(req.body)
          if(validatResult.error){
            return res.status(400).json({message: validatResult.error})
          }
          next()
          
    },
    putContactsValidation:(req, res, next)=>{
        const schema = Joi.object({
          name: Joi.string().min(3).max(15).required(),
          email: Joi.string().min(3).max(40).required().email().required(),
          phone: Joi.string().min(7).max(14).required(),
          favorite: Joi.boolean(),
          })
           const validatResult=schema.validate(req.body)
          if(validatResult.error){
           next( new ValidationError(validatResult.error.details))
          }
          next()   
    },
    favoriteContactScheme:(req, res, next)=>{
      const schema =Joi.object({
            favorite: Joi.boolean().required(),
          });
          const validatResult=schema.validate(req.body)
          if(validatResult.error){
           next( new ValidationError(validatResult.error.details))
          }
          next()  
        },
}