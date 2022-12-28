const Joi = require("joi");
const contactSchema = Joi.object({
  name: Joi.string().min(3).max(16).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().min(10).max(13).required(),
  favorite: Joi.boolean(),
});
module.exports = contactSchema;
