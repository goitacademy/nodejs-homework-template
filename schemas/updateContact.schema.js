const Joi = require("joi");

const updateContactSchema = Joi.object({
  // eslint-disable-next-line prefer-regex-literals
  name: Joi.string().pattern(new RegExp(`^[a-zA-Z]+ [a-zA-Z]+$`)).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
});

module.exports = {
  updateContactSchema,
};
