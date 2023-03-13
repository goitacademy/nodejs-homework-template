const Joi = require("joi");

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const addSchema = Joi.object({
  // name: Joi.string().min(3).max(30).required(),
  // email: Joi.string()
  //   .email({
  //     minDomainSegments: 2,
  //   })
  //   .required(),
  // phone: Joi.number().integer().required(),
  favorite: Joi.bool(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).min(1);

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
  registerSchema,
  loginSchema,
};
