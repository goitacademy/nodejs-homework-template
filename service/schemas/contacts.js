const {Schema, model} = require('mongoose');

const contacts = new Schema(
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
      }
);
contacts.index({ name: 1 });

const Contact = model('contact', contacts);

module.exports = Contact;