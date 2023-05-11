const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().required().min(3).max(30),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = {
  addSchema,
};
