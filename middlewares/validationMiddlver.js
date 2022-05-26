const Joi = require('joi');

module.exports={
    postContactsValidation:(req, res, next)=>{
        const schema = Joi.object({
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(30),
          
            number: 
            Joi.number()
            .integer(),
          })
          const validatResult=schema.validate(req.body)
          if(validatResult.error){
            return res.status(400).json({message: validatResult.error})
          }
          next()
          
    },
    putContactsValidation:(req, res, next)=>{
        const schema = Joi.object({
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(30),
          
            number: 
            Joi.number()
            .integer(),
          })
          const validatResult=schema.validate(req.body)
          if(validatResult.error){
            return res.status(400).json({message: validatResult.error})
          }
          
          next()
          
    }
}