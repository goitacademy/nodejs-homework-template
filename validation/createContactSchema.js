const Joi = require("joi");

const validationAddContact = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "string.base": "'name' should be a type of string",
    "string.max":
      "length of field 'name' must be less than or equal to 30 characters long",
    "string.min": "length of field 'name' must be at least 2 characters long",
    "any.required": "missing required field 'name'",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.base": "'email' should be a type of string",
      "string.email": "field 'email' must be a valid email",
      "any.required": "missing required field 'email'",
    }),
  phone: Joi.string().trim().required().messages({
    "string.base": "'phone' should be a type of string",
    "string.empty": "'phone' must contain value",
    "any.required": "missing required field 'phone'",
  }),
  favorite: Joi.boolean(),
});

const validationUpdateContact = Joi.object({
  name: Joi.string().min(2).max(30).messages({
    "string.base": "'name' should be a type of string",
    "string.max":
      "length of field 'name' must be less than or equal to 30 characters long",
    "string.min": "length of field 'name' must be at least 2 characters long",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .messages({
      "string.base": "'email' should be a type of string",
      "string.email": "field 'email' must be a valid email",
    }),
  phone: Joi.string().trim().messages({
    "string.base": "'phone' should be a type of string",
    "string.empty": "'phone' must contain value",
  }),
}).or("name", "email", "phone");

const validationUpdateFavorite = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
  }),
});

module.exports = {
  validationAddContact,
  validationUpdateContact,
  validationUpdateFavorite,
};
