const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required 'name' field" }),
  email: Joi.string().required().email().messages({
    "any.required": "missing required 'email' field",
    "string.email": "Invalid email format.",
  }),
  phone: Joi.string()
    .required()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .messages({
      "any.required": "missing required 'phone' field",
      "string.pattern.base":
        "Invalid phone number format. The expected format is (XXX) XXX-XXXX.",
    }),
  favorite: Joi.boolean(),
});

module.exports = contactAddSchema;
