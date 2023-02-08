const Joi = require("joi");

const productSchema = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { deny: ["ru", "ir"] },
      }).required(),
    phone: Joi.string().length(15).required(),
})

module.exports = productSchema;