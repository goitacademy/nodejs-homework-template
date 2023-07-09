const Joi = require("joi");

const setFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .error(() => new Error("favorite")),
});

const contactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .error(() => new Error("name")),
  email: Joi.string()
    .email()
    .required()
    .error(() => new Error("email")),
  phone: Joi.string()
    .min(10)
    .max(15)
    .required()
    .error(() => new Error("phone")),
  favorite: Joi.boolean(),
});

const userValidationSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .error(() => new Error("email")),
  password: Joi.string()
    .required()
    .min(6)
    .error(() => new Error("password")),
});

const userSubscriptionSchema = Joi.object({
  id: Joi.string().required(),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .error(() => new Error("subscription ('starter', 'pro', 'business')")),
});

module.exports = {
  setFavoriteSchema,
  contactSchema,
  userValidationSchema,
  userSubscriptionSchema,
};
