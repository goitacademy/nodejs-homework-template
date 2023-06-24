// const fs = require('fs/promises')
const mongoose = require('mongoose');
const contactSchema = mongoose.Schema(
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
    }
  },
    {
      timestamps: true,
      versionKey: false
  }
);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
