const Joi = require("joi");

const addContactShema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": '"name" not string',
    "any.required": "missing required name field",
  }),
  email: Joi.string().email().required().messages({
    "string.base": '"email" not string',
    "any.required": "missing required email field",
  }),
  phone: Joi.string().required().messages({
    "string.base": '"phone" not string',
    "any.required": "missing required phone field",
  }),
});

module.exports = addContactShema;
