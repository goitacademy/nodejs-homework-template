const Sex = require('./helpers/constants')
const mongoose = require('mongoose')

const { Schema, model, SchemaTypes } = mongoose

const contactSchema = new Schema({
    name: {
        type: String,
        minlength: 2,
        default: 'Guest'
    },
    phone: {
        type: String,
        enum: {
            values: [Sex.MALE, Sex.FEMALE, Sex.NONE],
            message: 'Not allowed'
        },
        default: Sex.NONE
    },
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'user'
    }
},
    { versionKey: false, timestamps: true }
)

const Contact = model('contact', contactSchema)

module.exports = Contact
