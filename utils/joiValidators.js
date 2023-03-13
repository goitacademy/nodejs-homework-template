const Joi = require('joi');
/**
 * Validate create user data.
 */
const createContactValidator = (data) => Joi.object({
  name: Joi.string().min(1).max(10).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  phone: Joi.string()
    .pattern(/^\+?([0-9]{1,3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
    .required(),
}).validate(data);

const updateContactValidateByID = (id, data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(10),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    phone: Joi.string()
      .pattern(/^\+?([0-9]{1,3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/),
  }).or('name', 'email', 'phone').required();

  const result = schema.validate(data);

  if (result.error) {
    throw new Error(result.error.message);
  }
  // Check that the ID parameter is valid
  if (id <= 0) {
    throw new Error('Invalid ID parameter');
  }
  return result.value;
};

exports.modules = {
  createContactValidator,
  updateContactValidateByID,
};
