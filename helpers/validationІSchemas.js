const Joi = require("joi");

const postSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(15).required(),
  favorite: Joi.boolean().optional(),
});

const putSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().max(15).optional(),
  favorite: Joi.boolean().optional(),
});

const patchSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  postSchema,
  putSchema,
  patchSchema,
};
