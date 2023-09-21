const Joi = require("joi");

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

const loginSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };
