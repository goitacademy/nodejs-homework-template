const Joi = require("joi");

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": `"name" must be exist`,
    "string.empty": `"name" cannot be an empty field`,
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": `"email" must be exist`,
      "string.email": `string must be email address`,
    }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": `"phone" must be exist` }),
});

module.exports = {
  schemaAddContact,
};
