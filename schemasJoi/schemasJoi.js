const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    // .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = { contactAddSchema, updateFavoriteSchema };

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

const userJoiSchema = { registerSchema, loginSchema };

const subscriptionVersion = ["starter", "pro", "business"];
const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionVersion)
    .required(),
});

module.exports = { schemas, userJoiSchema, subscriptionSchema };
