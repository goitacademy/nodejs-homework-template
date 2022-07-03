const Joi = require("joi");

const postContactJoiSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateContactJoiSchema = Joi.object({
  name: Joi.string().trim(),
  email: Joi.string().email().trim(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const favoriteContactJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = {
  postContactJoiSchema,
  updateContactJoiSchema,
  favoriteContactJoiSchema,
};
