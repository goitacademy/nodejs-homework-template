const Joi = require("joi");

const ReqSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .regex(/^[0-9]{9}$/)
    .messages({ "string.pattern.base": `Phone number must have 9 digits.` })
    .required(),
});

module.exports = ReqSchema;
