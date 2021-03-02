const mongoose = require('mongoose')

const { Schema, model } = mongoose

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please set name for the contact']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please set email for the contact']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password']
    }
})

const Contact = model('contact', contactSchema)

module.exports = Contact
