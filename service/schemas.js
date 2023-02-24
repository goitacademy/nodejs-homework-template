const mongoose = require('mongoose');
const { Schema, model, SchemaTypes } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      unique: true,
      require: [true, 'Set email'],
    },
    phone: {
      type: String,
      unique: true,
      require: [true, 'Set phone'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

const Contacts = model('contacts', contactSchema);
module.exports = Contacts;
