const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),

  phone: Joi.string().required(),
  favorit: false,
});

const userSchema = Joi.object({
  email: Joi.string()
  .required()
  .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: Joi.string()
  .required()
})

module.exports = {
  contactSchema,
  userSchema
};