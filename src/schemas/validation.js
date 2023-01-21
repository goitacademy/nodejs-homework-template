const Joi = require("joi");

const schemaRequired = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().min(7).max(15).required(),
  favorite: Joi.boolean().required(),
  owner: Joi.string().required(),
});

const schemaOptional = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  email: Joi.string().email({ minDomainSegments: 2 }).optional(),
  phone: Joi.string().min(7).max(15).optional(),
  favorite: Joi.boolean().optional(),
  owner: Joi.string().forbidden(),
});

const schemaAuth = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  schemaRequired,
  schemaOptional,
  schemaAuth,
};
