const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "any.required": `missing required name field`,
  }),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

module.exports = contactAddSchema;
