const Joi = require("joi");

const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ tlds: false }).required(),
  phone: Joi.string()
    .pattern(phonePattern)
    .messages({
      "string.pattern.base":
        "Invalid phone number format. The format should be (XXX) XXX-XXXX.",
    })
    .required(),
});

module.exports = contactsAddSchema;
