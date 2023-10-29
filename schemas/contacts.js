const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().optional().messages({
    "string.base": "name field should be a string",
  }),
  email: Joi.string().email().optional().messages({
    "string.base": "email field should be a string",
    "string.email": "email field should be a valid email address",
  }),
  phone: Joi.string().optional().messages({
    "string.base": "phone number field should be a string",
  }),
});

module.exports = {
  contactAddSchema,
};
