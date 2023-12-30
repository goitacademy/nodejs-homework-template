const Joi = require("joi");

const putSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.number(),
});

module.exports = putSchema;
