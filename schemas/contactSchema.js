const Joi = require("joi");

const contactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .min(4)
      .required(),
    phone: Joi.number().required(),
  });

module.exports = {
    contactSchema,
  };