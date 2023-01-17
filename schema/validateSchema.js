const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(30)
    .required()
    .messages({ "any.required": "missing required name field" }),
  phone: Joi.string()
    .trim()
    .pattern(
      /^[+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/
    )
    .required()
    .messages({ "any.required": "missing required phone field" }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .min(3)
    .required()
    .messages({ "any.required": "missing required email field" }),
  favorite: Joi.boolean().optional().default(false),
});

const contactStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  contactSchema,
  contactStatusSchema,
};
