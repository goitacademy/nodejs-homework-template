const Joi = require("joi");

const validateBody = require('../helpers/validateBody');

const addValid = validateBody(
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    phone: Joi.string().required(),
  }),
  "missing required field"
);

const updateValid = validateBody(
  Joi.object({
    name: Joi.string(),
    email: Joi.string().email().lowercase(),
    phone: Joi.string(),
  }),
  "missing field"
);

const updateFavoriteValid = validateBody(
  Joi.object({
    favorite: Joi.boolean().required(),
  }),
  "missing field favorite"
);

module.exports = { addValid, updateValid, updateFavoriteValid };