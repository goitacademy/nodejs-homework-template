const { default: mongoose } = require('mongoose');

const contactsSchema = new mongoose.Schema({
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
});

const contacts = mongoose.model('contacts', contactsSchema);

module.exports = contacts;