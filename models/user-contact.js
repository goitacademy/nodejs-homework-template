/* eslint-disable eol-last */
/* eslint-disable indent */
const { Schema, model } = require('mongoose')
const Joi = require('joi')

const userContactSchema = Schema({
    content: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
}, { versionKey: false, timestamps: true })

const joiSchema = Joi.object({
    content: Joi.string().required()
})

const UserContact = model('userContact', userContactSchema)

module.exports = {
    UserContact,
    joiSchema
}