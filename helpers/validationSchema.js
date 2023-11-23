const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(20),
  email: Joi.string().email({ minDomainSegments: 2 }),
});

module.exports = {
  schema,
};
