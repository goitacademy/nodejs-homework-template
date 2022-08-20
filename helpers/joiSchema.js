const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().default("John").min(3).max(30).required(),
  email: Joi.string().default("test@example.com").email(),
  phone: Joi.string().default("505505505").alphanum(),
});

module.exports = { schema };
