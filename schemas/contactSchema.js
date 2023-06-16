const Joi = require("joi");
const { nameRegexp } = require("../constants/users");

const contactSchema = Joi.object({
  name: Joi.string()
    .pattern(nameRegexp)
    .required()
    .messages({
      "any.required": "Missing required name field",
      "string.regex": "Invalid characters in name field",
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "Missing required email field" }),
  phone: Joi.string()
    .min(7)
    .max(14)
    .pattern(/^[0-9()-]+$/)
    .required()
    .messages({ "any.required": "Missing required phone field" }),
    favorite: Joi.boolean()
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

module.exports = {
  contactSchema,
  contactUpdateFavoriteSchema,
};
