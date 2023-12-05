const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
  phone: Joi.string().required().messages({
    "any.required": "Phone is required",
  }),
  favorite: Joi.boolean().required().messages({
    "any.required": "Favorite is required",
  }),
}).unknown(false);

const favoriteUpdateSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "Favorite is required",
  }),
});

module.exports = {
  contactSchema,
  favoriteUpdateSchema,
};
