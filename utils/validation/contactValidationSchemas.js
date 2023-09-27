const Joi = require("joi");

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const updateFavoriteScheme = Joi.object({
  favorite: Joi.bool().required(),
});

const schemas = {
  contactsAddSchema,
  updateFavoriteScheme,
};

module.exports = schemas;
