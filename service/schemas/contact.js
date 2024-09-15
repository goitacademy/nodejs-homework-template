const mongoose = require('mongoose');
const { Schema } = mongoose;

const contact = new Schema (
    {
        name: {
          type: String,
          required: [true, 'Set name for contact'],
        },
        email: {
          type: String,
          unique: true,
        },
        phone: {
          type: String,
        }, 
        favorite: {
          type: Boolean,
          default: false,
        },
      }, { timestamps: true, versionKey: false });

const Contact = mongoose.model("contact", contact);

module.exports = Contact;

