const Joi = require("joi");

const authSchema = Joi.object({
  password: Joi.string().min(6).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
});

module.exports = authSchema;
