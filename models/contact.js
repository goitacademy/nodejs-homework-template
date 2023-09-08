
const { Schema, model } = require('mongoose')
const { handleMongooseError } = require('../helpers')

const contactSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/,
        required: true,
    },
    phone: {
        type: String,
        match: /^\(\d{3}\) \d{3}-\d{4}$/,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false
    }
}, { versionKey: false });

contactSchema.post("save", handleMongooseError)

const Contact = model("contact", contactSchema)

module.exports = Contact