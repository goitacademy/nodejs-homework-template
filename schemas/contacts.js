const Joi = require("joi");
const NAME_RULE = /^[A-Za-z\s-]+$/;
const PHONE_RULE = /^\(\d{3}\) \d{3}-\d{4}$/;
const addContactSchema = Joi.object({
  name: Joi.string().min(2).max(30).pattern(NAME_RULE).required().messages({
    "string.base": "The name should be a type of text",
    "string.min": "The name must be at least 2 characters",
    "string.max": "The name should be no more than 30 characters",
    "string.pattern.base":
      "Name may contain only English letters, dash and spaces.",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required()
    .messages({
      "string.email":
        "Invalid email format (test@example.com). Allowed domains: com, net, ua",
    }),
  phone: Joi.string().pattern(PHONE_RULE).required().messages({
    "string.pattern.base":
      "The phone number should have the format (123) 123-1234.",
  }),
  favorite: Joi.boolean(),
}).messages({
  "any.required": "Missing required {{#label}} field!",
  "string.empty": "The {{#label}} field can't be empty!",
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(30).pattern(NAME_RULE).messages({
    "string.base": "The name should be a type of text",
    "string.min": "The name must be at least 2 characters",
    "string.max": "The name should be no more than 30 characters",
    "string.pattern.base":
      "Name may contain only English letters, dash and spaces.",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .messages({
      "string.email":
        "Invalid email format (test@example.com). Allowed domains: com, net, ua",
    }),
  phone: Joi.string().pattern(PHONE_RULE).messages({
    "string.pattern.base":
      "The phone number should have the format (123) 123-1234.",
  }),
  favorite: Joi.boolean(),
})
  .or("name", "email", "phone")
  .messages({
    "object.missing":
      "Missing fields! Сannot update the contact, enter info that you want to update!",
  });

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "Missing required {{#label}} field!",
    "string.empty": "The {{#label}} field can't be empty!",
    "object.missing":
      "Missing fields! Сannot update the contact, enter info that you want to update!",
  }),
});

module.exports = {
  addContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
};
