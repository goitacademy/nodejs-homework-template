const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
}).options({
  messages: { "any.required": "missing required {{#label}} field" },
});

module.exports = { contactAddSchema };
