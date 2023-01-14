const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
    .messages({
      "string.pattern.base":
        "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +",
    })
    .required(),
});

module.exports = {
  contactSchema,
};
