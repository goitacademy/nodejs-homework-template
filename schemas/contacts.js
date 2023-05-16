const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/).required().messages({
  'string.pattern.base': 'Incorrect phone format. Example: (748) 206-2688',
  'any.required': 'The phone field is required'
}),
});

module.exports = {
    addSchema,
}