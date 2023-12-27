const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  phone: Joi.string().min(10).max(15),
});

const contactSchemaRequired = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
});

const contactSchemaFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  contactSchema,
  contactSchemaRequired,
  contactSchemaFavorite,
};
