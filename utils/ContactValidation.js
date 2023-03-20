const Joi = require('joi');

const contactDataValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  });

  return schema.validate(data);
};

const updateContactStatusValidator = (data) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });

  return schema.validate(data);
};

module.exports = { contactDataValidator, updateContactStatusValidator };
