const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

module.exports = addSchema;
