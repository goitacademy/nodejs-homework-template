const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(20).trim().required(),

  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  phone: Joi.string()
    .regex(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
    .required(),
  favorite: Joi.bool(),
});

module.exports = contactSchema;
