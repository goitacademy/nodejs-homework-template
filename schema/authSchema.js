const Joi = require("joi");

const authSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

const authUpdateSub = Joi.object({
  subscription: Joi.string().required(),
});

module.exports = { authSchema, authUpdateSub };
