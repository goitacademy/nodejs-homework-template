const Joi = require("joi");
const schema = Joi.object({
  name: Joi.string().max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.number().required(),
});

module.exports = schema;
