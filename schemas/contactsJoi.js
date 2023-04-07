const Joi = require('joi');

const addShema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" missing fields`,
    "string.empty": `"name" cannot be empty`,
    "string.base": `"name" must be string`
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" missing fields`,
    "string.empty": `"email" cannot be empty`,
    "string.base": `"email" must be string`
  }),
  phone: Joi.number().required().messages({
    "any.required": `"phone" missing fields`,
    "number.empty": `"phone" cannot be empty`,
    "number.base": `"phone" must be number`
  }),
  phone: Joi.binary().min(6),
  phone: Joi.binary().max(16)
})

module.exports = addShema;