const { Schema, model } = require('mongoose');
const { phoneRegExp } = require('../utils');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 20,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      minLength: 5,
      match: phoneRegExp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model('contact', contactSchema);

module.exports = Contact;
