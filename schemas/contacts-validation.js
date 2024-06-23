import Joi from "joi";

const newContactValidation = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).required().messages({
    "any.required": '"name" must be exist',
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

  phone: Joi.number().integer().required().messages({
    "any.required": '"phone" must be exist',
  }),

  favorite: Joi.boolean(),
});

const contactsEditValidation = Joi.object({
  name: Joi.string().alphanum().min(3).max(20),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),

  phone: Joi.number().integer(),

  favorite: Joi.boolean(),
});

const contactsFavoriteValidation = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
  }),
});

export {
  newContactValidation,
  contactsEditValidation,
  contactsFavoriteValidation,
};