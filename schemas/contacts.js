const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(10).required(),
  favorite: Joi.boolean().default(false),
});
module.exports = contactSchema;
