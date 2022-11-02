const {Schema, model} = require('mongoose')

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }, 
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Contact = model('contact', contactSchema);

module.exports = Contact;