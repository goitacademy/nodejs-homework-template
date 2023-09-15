const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../helpers');
const { regexpList } = require('../variables');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      match: [regexpList.email, 'Email must be valid'],
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Set owner for contact'],
    },
  },
  { versionKey: false }
);

contactSchema.post('save', handleMongooseError);

const Contact = model('contact', contactSchema);

module.exports = Contact;
