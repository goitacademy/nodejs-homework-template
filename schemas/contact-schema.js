const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" is a required field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" is a required field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" is a required field`,
  }),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

module.exports = { contactAddSchema, contactUpdateSchema };
