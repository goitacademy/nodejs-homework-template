const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string()
    .regex(/^[A-Z]+ [A-Z]+$/i)
    .min(3)
    .max(30)
    .required(),

  phone: Joi.string()
    .min(7)
    .max(15)
    .pattern(/^\d+$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` }),

  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  favorite: Joi.boolean(),
});

const editContactSchema = Joi.object({
  name: Joi.string()
    .regex(/^[A-Z]+ [A-Z]+$/i)
    .min(3)
    .max(30),

  phone: Joi.string()
    .min(7)
    .max(15)
    .pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/),

  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  favorite: Joi.boolean(),
});

const updateFavoriveContact = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addContactSchema,
  editContactSchema,
  updateFavoriveContact,
};
