const Joi = require('joi')

const createSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required()
  });
  
  const updateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string()
  });

  module.exports = {
    createSchema,updateSchema
  }