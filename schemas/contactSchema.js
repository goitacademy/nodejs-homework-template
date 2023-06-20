const joi = require("joi");

const contactAddSchema = joi
  .object({
    name: joi.string().required(),
    phone: joi.string().required(),
    email: joi.string().required(),
    favorite: joi.bool(),
  })
  .messages({
    "any.required": "missing required {#key} field",
  });

const contactUpdateFavoriteSchema = joi
  .object({
    favorite: joi.bool().required(),
  })
  .messages({
    "any.required": "missing required {#key} field",
  });

module.exports = { contactAddSchema, contactUpdateFavoriteSchema };
