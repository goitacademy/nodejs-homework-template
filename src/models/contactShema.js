const { Schema, model} = require('mongoose');

const contactsSchema = new Schema({
        name: {
        type: String,
            require: true,
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
}, {versionKey: false, timestamps: true, writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000
  }});

const Contact = model('contact', contactsSchema);

module.exports = Contact;