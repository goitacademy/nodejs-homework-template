const Joi = require('joi');

const updateContactSchema = updatedContact => {
  const schema = Joi.object({
    name: Joi.string().min(2),
    email: Joi.string().email({ minDomainSegments: 2 }),
    phone: Joi.string(),
    owner: Joi.string(),
    favorite: Joi.boolean(),
  }).min(1);

  const { error } = schema.validate(updatedContact);
  return error;
};

module.exports = updateContactSchema;