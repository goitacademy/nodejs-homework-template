const Joi = require("joi");

const contactUpdateSchema = Joi.object({
    name: Joi.string().required().messages({'string.empty': '{#label}'}),
    email: Joi.string().required().messages({'string.empty': '{#label}'}),
    phone: Joi.string().required().messages({'string.empty': '{#label}'}),
    favorite: Joi.boolean()
})
// .and('name', 'email', 'phone')
.messages({'any.required': `{#label}`})

const contactUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
})

module.exports = {
    contactUpdateSchema,
    contactUpdateFavoriteSchema
}