const { Schema, model } = require('mongoose')

const contactSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
        default: false
    }
})

const Contact = model("contact", contactSchema)

module.exports = Contact