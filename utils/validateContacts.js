const Joi = require("joi")

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk", "org", "ca"] },
    })
    .required(),
  phone: Joi.string().min(2).max(20).required(),
})
module.exports = contactSchema
