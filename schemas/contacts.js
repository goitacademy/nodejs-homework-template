const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .regex(/^[A-Za-z]+\s[A-Za-z]+$/)
    .messages({
      "string.pattern.base":
        "Name and surname should consist of letters and be separated by a space",
    })
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .message({
      "string.email": "Please enter a valid email address",
    })
    .required(),
  phone: Joi.string()
    .regex(/^\d{10,}$/)
    .message({
      "string.pattern.base":
        "Phone number should consist of at least 10 digits",
    })
    .required(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "Missing field favorite",
  }),
});

module.exports = {
  contactSchema,
  favoriteSchema,
};
