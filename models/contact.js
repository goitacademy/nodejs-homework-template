const { Schema, model } = require("mongoose");

const contactScheme = new Schema({
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
    }
});

const Contact = model('contact', contactScheme);

module.exports = Contact;