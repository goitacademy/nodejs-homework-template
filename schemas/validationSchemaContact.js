const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .required()
    .messages({ "any.required": "Invalid name" }),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required()
    .messages({ "any.required": "Invalid email" }),

  phone: Joi.string()
    .length(9)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({ "any.required": "The number must be no more than 9 digits." }),

  favorite: Joi.boolean(),
});

module.exports = {
  contactSchema,
};
