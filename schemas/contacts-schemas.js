const Joi = require("joi");

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required name field`,
  }),
  email: Joi.string().email().required().messages({
    "any.required": `missing required email field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required phone field`,
  }),
  favorite: Joi.boolean().default(false),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  contactsAddSchema,
  updateFavoriteSchema,
};
