const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  phone: Joi.string()
    .pattern(new RegExp("^[-+0-9]{5,20}$"))
    .min(7)
    .max(15)
    .required(),

  favorite: Joi.boolean(),
});

module.exports = contactSchema;
