const Joi = require("joi");

const contactSchema = Joi.object({
  id: Joi.any(),
  name: Joi.string().required().messages({
    "any.required": `missing required field "title"`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required field "email"`,
  }),
  phone: Joi.number().required().messages({
    "any.required": `missing required field "phone"`,
  }),
});

module.exports = contactSchema;
