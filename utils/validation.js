const Joi = require("joi");

const customMessages = {
  name: {
    "string.pattern.base":
      "the field 'name' must only contain letters, may contain spaces",
  },
  phone: {
    "string.pattern.base":
      "the field 'phone' must only contain numbers,alternatively it can contain a hyphen but no brackets,",
  },
};

const schema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z\s-]+$/)
    .min(3)
    .max(30)
    .trim()
    .messages(customMessages.name),
  email: Joi.string().email().trim(),
  phone: Joi.string()
    .pattern(/^[\d-]+$/)
    .min(3)
    .max(16)
    .trim()
    .messages(customMessages.phone),
});

module.exports = schema;
