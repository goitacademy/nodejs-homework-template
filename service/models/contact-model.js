const {Schema, model} = require('mongoose');
const { regexp } = require('../../vars');

const contactSchema = new Schema(
    {
        name: {
            type: String,
            require: [true, 'Set name for contact'],
        },
        email: {
            type: String,
            match: regexp.email,
        },
        phone: {
            type: String,
            require: true,
            match: regexp.phone,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false }
);

exports.ContactModel = model('contact', contactSchema)