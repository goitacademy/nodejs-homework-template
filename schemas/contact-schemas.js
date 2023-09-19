import Joi from 'joi';

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'any.required': 'missing required name field',
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required()
    .messages({
      'any.required': 'missing required email field',
    }),
  phone: Joi.string().min(6).max(20).required().messages({
    'any.required': 'missing required phone field',
  }),
});

export default {
  contactAddSchema,
};
