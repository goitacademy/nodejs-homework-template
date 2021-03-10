const mongoose = require('mongoose')

const { Schema, SchemaTypes, model } = mongoose

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please set name for the contact']
    },
    email: {
        type: String,
        required: [true, 'Please set email for the contact']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password']
    },
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
    }
},
    { versionKey: false, timestamps: true })

const Contact = model('contact', contactSchema)

module.exports = Contact
