const Joi = require("joi");
const addSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Missing required name field',
  }),
  email: Joi.string().required().messages({
    'any.required': 'Missing required email field',
  }),
  phone: Joi.string().required().pattern(/^\(\d{3}\) \d{3}-\d{4}$/).messages({
    'any.required': 'Missing required phone field',
    'string.pattern.base': 'Invalid phone number format. Expected format: (XXX) XXX-XXXX',
  }),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
})
module.exports = {
  addSchema,
  updateFavoriteSchema,
};