const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z\s'’ʼ-]{3,30}$/)
    .required()
    .messages({
      "string.empty": "name cannot be an empty field",
      "any.required": "missing required name field",
    }),
  email: Joi.string().email().required().messages({
    "string.empty": "email cannot be an empty field",
    "any.required": "missing required email field",
  }),
  phone: Joi.string()
    .pattern(/^[0-9()+\s-]{10,19}$/)
    .required()
    .messages({
      "string.empty": "phone cannot be an empty field",
      "any.required": "missing required phone field",
    }),
});

module.exports = contactSchema;
