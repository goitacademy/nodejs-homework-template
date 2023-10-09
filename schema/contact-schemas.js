const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required "name" field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required "email" field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required "phone" field`,
  }),
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field favorite`,
  }),
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field favorite`,
  }),
});

module.exports = { contactAddSchema, contactUpdateFavoriteSchema };
