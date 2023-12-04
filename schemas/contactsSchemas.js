import Joi from 'joi'

export const addContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().regex(/^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/).messages({ 'string.pattern.base': 'Phone number must be in (xxx) xxx-xxxx format.' }).required()

})
export const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().regex(/^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/).messages({ 'string.pattern.base': 'Phone number must be in (xxx) xxx-xxxx format.' })

})
export const addToFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required().messages({ 'string.pattern.base': 'Missing field favorite.' })

})