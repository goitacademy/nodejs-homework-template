const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required "name"`,
    "string.empty": `"name" cannot be empty`,
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": `missing required "email"`,
      "string.empty": `"email" cannot be empty`,
    }),
  phone: Joi.number().required().messages({
    "any.required": `missing required "phone"`,
    "string.empty": `"phone" cannot be empty`,
  }),
});

module.exports = {
  addSchema,
};
