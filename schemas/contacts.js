const Joi = require('joi');

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  }); 

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).min(1);

module.exports = { 
    addSchema, 
    updateSchema
}
