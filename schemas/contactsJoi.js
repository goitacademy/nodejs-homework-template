const Joi = require('joi');

const addShema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" is required`,
    "string.empty": `"name" cannot be empty`,
    "string.base": `"name" must be string`
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" is required`,
    "string.empty": `"email" cannot be empty`,
    "string.base": `"email" must be string`
  }),
  phone: Joi.number().required().messages({
    "any.required": `"phone" is required`,
    "number.empty": `"phone" cannot be empty`,
    "number.base": `"phone" must be number`
  }),
  phone: Joi.binary().min(6),
  phone: Joi.binary().max(16)
})

module.exports = addShema;