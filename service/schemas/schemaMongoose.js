const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const schemaMongoose = new Schema(
    {
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
    },
    { versionKey: false, timestamps: true }
)

const Contact = model('contact', schemaMongoose);

module.exports = Contact;