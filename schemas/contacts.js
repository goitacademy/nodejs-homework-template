const Joi = require("joi");
const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Missing required name field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "Missing required phone field",
  }),
  email: Joi.string().required().messages({
    "any.required": "Missing required email field",
  }),
});

module.exports = {
  contactSchema,
};
