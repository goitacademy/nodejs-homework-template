const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "any.required": `"name" must be exist`,
  }),
  email: Joi.string().trim().email().required().messages({
    "any.required": `"email" must be exist`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" must be exist`,
  }),
});

module.exports = {
  contactAddSchema,
};
