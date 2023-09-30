const Joi = require("joi");

const postSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const putSchema = Joi.object().min(1);

module.exports = {
  postSchema,
  putSchema,
  updateFavoriteSchema,
};