const Joi = require('joi');

const reqContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateFavoriteShema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  reqContactSchema,
  updateFavoriteShema,
};
