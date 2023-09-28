const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string()
    .min(2)
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
  favorite: Joi.boolean(),
}).messages({ "any.required": "missing required {#label} field" });

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

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field favorite`,
  }),
});

module.exports = {
  addContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
};
