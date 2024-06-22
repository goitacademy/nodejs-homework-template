import Joi from "joi";

const newContactValidation = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).required().messages({
    "any.required": '"name" must be exist',
  }),

  phone: Joi.number().integer().required().messages({
    "any.required": '"phone" must be exist',
  }),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required()
    .messages({
      "any.required": '"email" must be exist',
    }),
});

const contactsEditValidation = Joi.object({
  name: Joi.string().alphanum().min(3).max(20),

  phone: Joi.number().integer(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

export { newContactValidation, contactsEditValidation };