const Joi = require("joi")

const addSchemas = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
  phone: Joi.string().min(9).max(14).required(),
});

module.exports = {
  addSchemas,
};