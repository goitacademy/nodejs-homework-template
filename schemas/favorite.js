import Joi from 'joi'

export const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})