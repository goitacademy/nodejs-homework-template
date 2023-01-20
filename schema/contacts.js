const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `Missing required name field`,
  }),
  email: Joi.string().email().required().messages({
    "any.required": `Missing required name field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `Missing required name field`,
  }),
});

module.exports = { contactSchema,};
