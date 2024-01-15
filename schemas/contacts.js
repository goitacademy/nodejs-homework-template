import Joi from 'joi'

export const schema = Joi.object({
  name: Joi.string().min(5).max(50).alphanum().required(),
  email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
  phone: Joi.number().integer().required(),
})