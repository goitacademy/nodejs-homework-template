const Joi = require("joi");

const contactPutSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/),
})
  .min(1)
  .max(3)
  .custom((value, helpers) => {
    if (!value.name && !value.email && !value.phone) {
      return helpers.error("object.or");
    }
    return value;
  }, "custom validation")
  .unknown(false)
  .messages({
    "object.min": "At least one field (name, email, or phone) is required.",
    "object.max":
      "Only up to three fields are allowed (name, email, or phone).",
    "object.or": "At least one field (name, email, or phone) is required.",
    "object.unknown": "Only 'name', 'email', or 'phone') fields are allowed .",
    "string.email": "Invalid email format.",
    "string.pattern.base":
      "Invalid phone number format. The expected format is (XXX) XXX-XXXX.",
  });

module.exports = contactPutSchema;
