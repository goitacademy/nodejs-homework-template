const Joi = require("joi");

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
})
  .min(1)
  .message(`Missing Fields`);

module.exports = updateSchema;
