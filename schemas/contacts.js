const Joi = require('joi');

const postSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .messages({
      'string.pattern.base':
        'Phone number should be in the following format: (123) 456-7890',
    })
    .required(),
});

const putSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .messages({
      'string.pattern.base':
        'Phone number should be in the following format: (123) 456-7890',
    }),
});

module.exports = {
  postSchema,
  putSchema,
};
