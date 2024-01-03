const Joi = require("joi");

const userValidSchema = Joi.object({
  password: Joi.string().min(6).required(),

  email: Joi.string()
    .email()
    .required(),
});

const updateSub = Joi.object({
  subscription: Joi.string()
    .required()
    .valid("starter", "pro", "business"),
});

module.exports = { userValidSchema, updateSub };
