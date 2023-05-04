const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  email: Joi.string().email().required(),
  favorite: Joi.boolean().default(false),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/),
  email: Joi.string().email(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
};
