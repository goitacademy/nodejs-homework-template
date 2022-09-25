const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  number: Joi.number().required(),
});

module.exports = addSchema;
