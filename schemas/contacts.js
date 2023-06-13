const joi = require('joi');

const addSchema = joi.object({
  name: joi.string().min(3).max(20).required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })
    .required(),
  phone: joi.string().min(6).required(),
});

module.exports = {
  addSchema,
};
