const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(40).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string().min(2).max(40).required(),
  favorite: Joi.boolean(),
});

module.exports = contactSchema;
