const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .pattern(/^\+\d{2} \(\d{3}\) \d{3}-\d{2}-\d{2}$/)
    .messages({
      "string.pattern.base": `Phone number must be +XX (XXX) XXX-XX-XX`,
    })
    .min(10)
    .required(),
});

module.exports = {
  addSchema,
};
