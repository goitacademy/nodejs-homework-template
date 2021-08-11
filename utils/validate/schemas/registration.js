const Joi = require('joi');

const registrationValidator = newUser => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(newUser);
  return error;
};

module.exports = registrationValidator;