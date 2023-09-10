const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
    .required()
    .messages({ "string.pattern.base": "invalid characters in the name" }),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(
      /^[+(\d]?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
    )
    .required()
    .messages({ "string.pattern.base": "invalid phone number" }),
}).messages({
  "any.required": `{#key} is a required field`,
  "string.email": "email field must be a valid email",
  "string.base": `{#key} field must be a string`,
  "object.unknown": `{#key} field is not allowed`,
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
})
  .min(1)
  .messages({
    "object.min": "missing fields",
    "string.base": `{#key} field must be a string`,
    "object.unknown": `{#key} field is not allowed`,
  });

module.exports = {
  addContactSchema,
  updateContactSchema,
};
