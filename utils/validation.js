const Joi = require("joi");

const validationFailureMsg = {
  name: {
    "string.pattern.base": "Field 'name' can only contain letters",
  },
  phone: {
    "string.pattern.base": "Field 'phone' can only contain numbers",
  },
};

const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .trim()
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages(validationFailureMsg.name),
  email: Joi.string().email().trim().required(),
  phone: Joi.string()
    .min(3)
    .max(16)
    .trim()
    .pattern(/^\d+$/)
    .required()
    .messages(validationFailureMsg.phone),
});

module.exports = schema;
