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

const userShema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
  subscription: Joi.string().optional(),
});

const subscriptionShema = Joi.object({
  subscription: Joi.string().required(),
});

module.exports = {
  postSchema,
  putSchema,
  patchSchema,
  userShema,
  subscriptionShema,
};
