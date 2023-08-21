const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" must be required`,
    "string.empty": `"name" cannot be an empty field`,
  }),
  email: Joi.string().required().messages({
    "string.empty": `"email" cannot be an empty field`,
  }),
  phone: Joi.string().required().min(10).messages({
    "string.empty": `"phone" cannot be an empty field`,
    "string.min": `"phone" should have a minimum {#limit} number`,
  }),
});

module.exports = {
  contactsSchema,
};
