const Joi = require("joi");

const setFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .error(() => new Error("name")),
  email: Joi.string()
    .email()
    .required()
    .error(() => new Error("email")),
  phone: Joi.string()
    .min(10)
    .max(15)
    .required()
    .error(() => new Error("phone")),
  favorite: Joi.boolean(),
});

module.exports = { setFavoriteSchema, contactSchema };
