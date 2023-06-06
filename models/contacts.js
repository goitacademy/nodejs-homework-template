const { Schema, model } = require('mongoose');

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      uniq: true,
    },
    phone: {
      type: String,
      match: /^(?:\+38)?(0\d{9})$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },

  { versionKey: false, timestamps: true }
);

const Contacts = model('contact', contactsSchema);

module.exports = { Contacts };