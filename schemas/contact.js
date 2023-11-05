const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(new RegExp("^\\(\\d{3}\\) \\d{3}-\\d{4}$"))
    .required(),
});

module.exports = contactSchema;
