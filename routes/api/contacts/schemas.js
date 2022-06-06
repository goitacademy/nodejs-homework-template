const Joi = require("joi");

const joiPostSchema = Joi.object(  {
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

const joiPutSchema = Joi.object(  {
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
})

module.exports = {
  joiPostSchema,
  joiPutSchema
}