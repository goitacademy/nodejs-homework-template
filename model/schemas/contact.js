const mongoose = require('mongoose');
const { Schema, model, SchemaTypes } = mongoose;

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true , 'Set name contact'],
    },
    email: {
        type: String,
        required: [true, 'Set email contact'],
    },
    phone: {
        type: String,
        required: [true, 'Set Number contact'],
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
    },
}, {versionKey: false, timestamps: true});

const Contact = model('contact', contactSchema)

module.exports = Contact

contactSchema.path('name').validate(function (value) {
    const re = /[A-Z]\w+/
    return re.test(String(value))
})

contactSchema.path('email').validate(function (value) {
    // eslint-disable-next-line
    const re = new RegExp ('^[a-z0-9_-]+\.*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$')
    return re.test(String(value))
})

contactSchema.path('phone').validate(function (value) {
        // eslint-disable-next-line
    const re = new RegExp('^[(][0-9]{3}[)] [0-9]{3}[-][0-9]{4}$')
    return re.test(String(value))
})
