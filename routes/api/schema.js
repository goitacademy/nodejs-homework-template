const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(33),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().pattern(/^[0-9()]+$/, "numbers"),
});

module.exports = { schema };
