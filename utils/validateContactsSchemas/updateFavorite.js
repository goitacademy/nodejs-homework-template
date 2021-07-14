const Joi = require('joi')


const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().default(false).required()
})

module.exports = updateFavoriteSchema
