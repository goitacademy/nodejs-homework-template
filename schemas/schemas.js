const Joi = require("joi");
const dataRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;

const contactSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(40)
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .trim()
    .pattern(dataRegexp)
    .messages({
      messages:
        "Invalid phone number format. Please fill a valid phone number (000) 000-0000.",
    })
    .required()
    .messages({ "any.required": "missing required phone field" }),
  favorite: Joi.boolean(),
});

const contactPutSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(40)
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .trim()
    .email()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .trim()
    .pattern(dataRegexp)
    .messages({
      messages:
        "Invalid phone number format. Please fill a valid phone number (000) 000-0000.",
    })
    .messages({ "any.required": "missing required phone field" }),
  favorite: Joi.boolean(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing required field favorite" }),
});
const schemas = {
  contactSchema,
  favoriteSchema,
  contactPutSchema,
  dataRegexp,
};
module.exports = { schemas };
