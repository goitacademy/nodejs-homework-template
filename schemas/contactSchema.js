const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp(/^[A-Za-z]+\s[A-Za-z]+$/))
    .required(),
  email: Joi.string()
    .pattern(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
    .required(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ 'string.pattern.base': `Phone number must have 10 digits.` })
    .required(),
  favorite: Joi.boolean(),
});


module.exports = {
  addSchema,
};