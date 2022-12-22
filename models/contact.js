const { Schema, model } = require('mongoose');

const contactSchema = Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 70,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      minlength: 2,
      maxlength: 70,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
      validate: /^\(\d\d\d\) \d\d\d-\d\d\d\d$/i,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Contact = model('contact', contactSchema);

module.exports = Contact;
