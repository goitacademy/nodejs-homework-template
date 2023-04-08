const Joi = require("joi");

const schemaAdd = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.number().integer().required(),
  favorite: Joi.bool(),
});

module.exports = {
    schemaAdd,
}