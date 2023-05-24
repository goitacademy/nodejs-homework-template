const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(2).max(25).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().min(2).max(12).required(),
});

module.exports = {
  addSchema,
};
