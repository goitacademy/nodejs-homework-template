const Joi = require("joi");

const findUserSchema = Joi.object({
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    password: Joi.string()
    .min(6).max(10).required().messages({
      "any.required": "Password is required and must contain 6 to 32 symbols...",
    }),
});

module.exports = {findUserSchema};