const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactsSchema = new Schema(
  {
    name: String,
    lastname: String,
    email: {
      type: String,
      match: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
    },
    phone: String,
    favorite: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Contacts = mongoose.model('contacts', contactsSchema);

module.exports = Contacts;
