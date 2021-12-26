const Joi = require("joi");

const schemaAdd = Joi.object({
  name: Joi.string().required(),  
  email: Joi.string().email().required(),    
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
})

const schemaUpdate = Joi.object({
  name: Joi.string(),    
  email: Joi.string(),
  phone: Joi.string(),
   favorite: Joi.boolean(),
}).min(1)

const schemaUpdateFavorite = Joi.object({
  name: Joi.string(),    
  email: Joi.string(),
  phone: Joi.string(),
   favorite: Joi.boolean().required(),
}).min(1)

module.exports = {
  schemaAdd,  
  schemaUpdate,
  schemaUpdateFavorite    
}