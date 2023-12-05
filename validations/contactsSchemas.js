const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name field should be a string",
    "any.required": "Name field is required",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
    .required()
    .messages({
      "string.base": "Email field should be a string",
      "string.email": "Email field format is 'example@mail.com'",
      "any.required": "Email field is required",
    }),
  phone: Joi.string()
    .pattern(/^\+380 \d{2} \d{3} \d{4}$/)
    .required()
    .messages({
      "string.base": "Phone field should be a string",
      "string.pattern.base": "Phone field format is '+380 XX XXX XXXX'",
      "any.required": "Phone field is required",
    }),
  favorite: Joi.boolean().messages({
    "string.base": "Favorite field should be a boolean",
  }),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "boolean.base": "Favorite field should be a boolean",
    "any.required": "Favorite field is required",
  }),
});

module.exports = {
  addSchema,
  updateFavoriteSchema,
};
