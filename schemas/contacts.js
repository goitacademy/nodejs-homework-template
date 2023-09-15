const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "any.required": `missing required name field`,
    "string.empty": `"name" cannot be empty, min 2 max 30 letters`,
    "string.base": `"name" must be string`,
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "uk", "ca", "org"] },
    })
    .required()
    .messages({
      "any.required": `missing required email field`,
      "string.empty": `"email" cannot be empty`,
    }),
  phone: Joi.string().min(5).max(15).required().messages({
    "any.required": `missing required phone field`,
    "string.empty": `"phone" cannot be empty, min 5 max 15 numbers.`,
  }),
});

module.exports = {
  addSchema,
};
