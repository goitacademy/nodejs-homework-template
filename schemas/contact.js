const Joi = require("joi");

const addContactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const updateFavoriteByIdSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addContactsSchema,
  updateFavoriteByIdSchema,
};
