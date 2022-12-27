const Joi = require("joi");
const contactSchema = Joi.object({
  name: Joi.string().required().alphanum(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

module.exports = contactSchema;
