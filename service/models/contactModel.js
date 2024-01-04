const {Schema, model, Types} = require('mongoose');
const { regexp } = require('../../vars');

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
        },
        email: {
            type: String,
            match: regexp.email,
        },
        phone: {
            type: String,
            required: true,
            match: regexp.phone,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: Types.ObjectId,
            ref: 'user',
            required: true,
        },
    },
    { versionKey: false }
);

exports.Contact = model('contact', contactSchema)