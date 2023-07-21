const Joi = require('joi');
const {Schema, model} = require('mongoose')
const {handleMongooseError} = require('../utility')

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, {versionKey: false, timestamps: true})

contactSchema.post('save', handleMongooseError)

const Contact = model('contact', contactSchema)

const addSchema = Joi.object({
    name: Joi.string()
    .min(3)
    .max(30)
    .required(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.number().required(),
    favorite: Joi.boolean(),
})

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemas = {
    addSchema,
    updateFavoriteSchema,
}

module.exports = {
    schemas,
    Contact
}