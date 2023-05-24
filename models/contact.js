const { Schema, model } = require('mongoose')
const Joi = require("joi")

const handleMongooseError = require('../helpers/handleMongooseError')

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false, timestamps: true })

contactSchema.post('save', handleMongooseError)

const Contact = model("contact", contactSchema)


const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.number().required()
})

const changeSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.number()
})

const changeFavoriteStatus = Joi.object(({
    favorite: Joi.boolean().required(),
}))

const schemas = {
    addSchema,
    changeSchema,
    changeFavoriteStatus
}

module.exports = { Contact, schemas }