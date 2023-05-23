const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9 ]{3,30}$/,
    },
    email: {
      type: String,
      required: true,
      match: /^([a-z0-9_.-]+)@([a-z09_.-]+).([a-z]{2,6})$/,
    },
    phone: {
      type: String,
      required: true,
      match: /^[+]?[0-9-]{5,13}$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
};
