const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({ "any.required": "you should fill name field" }),
  phone: Joi.number()
    .min(12)
    .required()
    .messages({ "any.required": "you should fill phone field" }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .min(5)
    .required()
    .messages({ "any.required": "you should fill email field" }),
  favorite: Joi.boolean().optional(),
});

const updatedStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addContactSchema,
  updatedStatusContactSchema,
};
