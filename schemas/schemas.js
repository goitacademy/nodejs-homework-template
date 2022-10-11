const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(3).alphanum().required(),
  email: Joi.string().required(),
  phone: Joi.number().integer().required(),
});

module.exports = {
  addSchema,
};
