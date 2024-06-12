const Joi = require("joi");

const contactsAddSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9\-+]{9,15}$/)
    .required()
    .messages({
      "string.empty": `"name" cannot be an empty field`,
      "any.required": `missing required "name" field`,
    }),
});

module.exports = {
  contactsAddSchema,
};
