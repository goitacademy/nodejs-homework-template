const Joi = require("joi");

const phoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" is a required field`,
    "string.empty": `"name" cannot be an empty field`,
  }),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "co", "uk"] },
    })
    .messages({
      "any.required": `"email" is a required field`,
      "string.empty": `"email" cannot be an empty field`,
    }),
  phone: Joi.string().pattern(phoneRegexp).required().messages({
    "any.required": `"phone" is a required field`,
    "string.empty": `"phone" cannot be an empty field`,
  }),
});

module.exports = {
  contactAddSchema,
};
