const Joi = require("joi");

const schemaChangeContact = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "missing required name field",
    "string.empty": "field 'name' is not allowed to be empty",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "missing required email field",
    "string.empty": "field 'email' is not allowed to be empty",
  }),

  phone: Joi.string()
    .pattern(/^[0-9]{7,17}$/)
    .required()
    .messages({
      "any.required": "missing required phone field",
      "string.empty": "field 'phone' is not allowed to be empty",
    }),
});

const schemaCreateContact = schemaChangeContact;

const schemaUpdateContact = schemaChangeContact;

module.exports = { schemaCreateContact, schemaUpdateContact };
