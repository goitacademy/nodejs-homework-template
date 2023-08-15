const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({ "any.required": "missing required name field" }), 
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "ca", "ua", "uk"] }
    })
    .required()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .min(9)
    .max(15)
    .required()
    .messages({ "any.required": "missing required phone field" }),
});

module.exports = {
  schema,
}