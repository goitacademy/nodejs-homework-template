const Joi = require("joi");

const phoneRegexp = /^\(?(\d{3})\)? \d{3}-\d{4}$/;

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  phone: Joi.string().pattern(phoneRegexp).required().messages({
    "string.pattern.base": "the phone should be in format (111) 111-1111",
  }),
  favorite: Joi.boolean(),
}).messages({
  "any.required": "missing required {#key} field",
});

const contactUpdateSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  phone: Joi.string().pattern(phoneRegexp).required().messages({
    "string.pattern.base": "the phone should be in format (111) 111-1111",
  }),
  favorite: Joi.boolean(),
}).messages({
  "any.required": "missing fields",
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
}).messages({
  "any.required": "missing field {#key}",
});

module.exports = {
  contactAddSchema,
  contactUpdateSchema,
  contactUpdateFavoriteSchema,
};
