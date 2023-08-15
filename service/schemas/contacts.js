// service/schemas/contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: String,
    phone: String,
    favorite: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Contact', contactSchema);



