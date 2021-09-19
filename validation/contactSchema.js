/* eslint-disable prefer-regex-literals */
const Joi = require('joi');

const joiContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),

  phone: Joi.string()
    .pattern(RegExp('^[(][0-9]{3,3}[)][ ][0-9]{3,3}[-][0-9]{4,4}$'))
    .required(),
});

module.exports = joiContactSchema;
