const Joi = require("joi");

const schemaAdd = Joi.object({
  name: Joi.string().required(),  
  email: Joi.string().email().required(),    
  phone: Joi.string().required()
})

const schemaUpdate = Joi.object({
  name: Joi.string(),    
  email: Joi.string(),
  phone: Joi.string()
}).min(1)

module.exports = {
    schemaAdd,
    schemaUpdate
}