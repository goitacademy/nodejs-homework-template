const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  email: Joi.string().required(),
  phone: Joi.number().integer().required(),
});

module.exports = {
  contactSchema,
};
