const Joi = require("joi");

const addContactValidationSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
});

const updateStatusFavorite = Joi.object().keys({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addContactValidationSchema,
  updateStatusFavorite,
};
