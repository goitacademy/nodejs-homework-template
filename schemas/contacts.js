const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).required().messages({
    "string.empty": `"name" cannot be an empty field`,
    "any.required": `missing required "name" field`,
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.empty": `"email" cannot be an empty field`,
      "any.required": `missing required "email" field`,
    }),
  phone: Joi.string()
    .pattern(/^[0-9\-+]{9,15}$/)
    .required()
    .messages({
      "string.empty": `"phone" cannot be an empty field`,
      "any.required": `missing required "phone" field`,
    }),
  favorite: Joi.boolean(),
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field "favorite"`,
  }),
});

module.exports = {
  contactAddSchema,
  contactUpdateFavoriteSchema,
};
