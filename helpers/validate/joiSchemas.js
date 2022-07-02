const Joi = require("joi");

const postJoiSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateJoiSchema = Joi.object({
  name: Joi.string().trim(),
  email: Joi.string().email().trim(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = {
  postJoiSchema,
  updateJoiSchema,
  favoriteJoiSchema,
};
