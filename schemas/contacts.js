const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .regex(/^\p{L}+$/u)
    .messages({
      "string.pattern.base": "Invalid name. It should only contain letters",
    })
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages({
      "string.pattern.base": "Invalid email adress",
    })
    .required(),
  phone: Joi.string()
    .regex(/^\+?[0-9]{7,15}$/)
    .messages({
      "string.pattern.base":
        'Invalid phone number format. It should consist of digits and optional "+" sign for international numbers.',
    })
    .required(),
});

const patchSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {contactSchema, patchSchema};
