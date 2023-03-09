const Joi = require("joi");

const userRegisterSchema = Joi.object({
  email: Joi.string()
    .pattern(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)
    .required(),
  password: Joi.string().required(),
  subscription: Joi.string().required(),
});
const userLoginSchema = Joi.object({
  email: Joi.string()
    .pattern(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)
    .required(),
  password: Joi.string().required(),
});
const subscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});

module.exports = {
  userRegisterSchema,
  userLoginSchema,
  subscriptionSchema,
};
