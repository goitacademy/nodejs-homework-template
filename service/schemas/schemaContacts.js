const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const schemaContacts = new Schema(
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
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        }
    },
    { versionKey: false, timestamps: true }
)

const Contact = model('contact', schemaContacts);

module.exports = Contact;