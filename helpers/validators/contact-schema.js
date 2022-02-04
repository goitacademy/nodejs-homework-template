const joi = require('joi')

const contactSchema = joi.object({
    name: joi.string().required().min(3).max(40),
    email: joi.string().required().email(),
    phone: joi.string().required(),
    favorite: joi.boolean()
})

const updateContactSchema = joi.object({
        name: joi.string().min(3).max(40),
        email: joi.string().email(),
        phone: joi.string(),
        favorite: joi.boolean()
    }
)

const updateFavoriteSchema = joi.object({
    favorite: joi.boolean().required()
})

module.exports = {
    contactSchema,
    updateContactSchema,
    updateFavoriteSchema
};
