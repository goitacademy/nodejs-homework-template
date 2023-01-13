import Joi from 'joi';

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(7).max(16).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
});

export default contactSchema;
