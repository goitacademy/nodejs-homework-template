const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
    .messages({
      "string.pattern.base":
        "Invalid number: must contain between 10 and 14 characters; phone number must be digits and can contain spaces, dashes, parentheses and can start with +.",
    })
    .required(),
  favorite: Joi.boolean().default("false").optional(),
});

const contactStatusSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "Missing field favorite",
  }),
});

module.exports = {
  contactSchema,
  contactStatusSchema,
};
