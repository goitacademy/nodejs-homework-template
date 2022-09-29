const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  // phone: Joi.alternatives([Joi.string(), Joi.number()]),
});

module.exports = {
  addSchema,
};
