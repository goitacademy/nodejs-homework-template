/* eslint-disable prefer-regex-literals */
const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),

  phone: Joi.string().required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(2).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .optional(),

  phone: Joi.string().optional(),
});
module.exports = { schemaCreateContact, schemaUpdateContact };
