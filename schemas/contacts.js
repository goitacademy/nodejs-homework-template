const Joi = require("joi");

const addSchema = Joi.object({
  name:Joi.string().required(),
  email:Joi.string().required(),
  phone:Joi.string().required(),
  favorite:Joi.boolean().required(),
});

const updateSchema =  Joi.object().keys({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite:Joi.boolean(),
})

module.exports = {addSchema, updateSchema};