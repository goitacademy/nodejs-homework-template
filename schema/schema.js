const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .pattern(new RegExp("^[0-9]{3}-[0-9]{2}-[0-9]{2}$"))
    .required(),
}).with("name", ["email", "phone"]);

module.exports = schema;
