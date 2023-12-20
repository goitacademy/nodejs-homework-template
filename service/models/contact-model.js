const {Schema, model} = require('mongoose')

const contactSchema = new Schema(
    {
        name: {
            type: String,
            require: [true, 'Set name for contact'],
        },
        email: {
            type: String,
            match: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
        },
        phone: {
            type: String,
            require: true,
            match: /^\(\d{3}\) \d{3}-\d{4}$/,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false }
);

exports.ContactModel = model('contact', contactSchema)