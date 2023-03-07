const Joi = require("joi");

const joiContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
});

module.exports = {
  joiContactSchema,
  updateFavoriteSchema
};