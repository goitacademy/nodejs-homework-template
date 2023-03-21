const Joi = require("joi");

const phoneRegexp = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegexp),

  favorite: Joi.bool(),
});

const updateFavorite = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = { joiSchema, updateFavorite };
