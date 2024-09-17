const Joi = require("joi");

const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be an empty field`,
  }),
    email: Joi.string(),
    phone: Joi.string(),
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  contactAddSchema,
  contactUpdateFavoriteSchema,
};