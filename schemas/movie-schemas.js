import Joi from 'joi'

export const movieAddSchema = Joi.object({
  title: Joi.string().required({
    'any.required': `'title' must be exist`,
    'string.base': `'title' must be string`
  }),
  director: Joi.string().required(),
})
export const movieUpdateSchema = Joi.object({
  title: Joi.string().required({
    'string.base': `'title' must be string`
  }),
  director: Joi.string().required(),
})