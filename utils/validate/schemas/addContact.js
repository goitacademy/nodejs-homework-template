const Joi = require('joi');

const addContactValidator = newContact => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    phone: Joi.string(),
    owner: Joi.string(),
  });
  const { error } = schema.validate(newContact);
  return error;
};

module.exports = addContactValidator;