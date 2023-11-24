const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().min(9).max(15),
});

module.exports = {
  schema,
};
