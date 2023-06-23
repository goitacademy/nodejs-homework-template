const { Schema, model } = require('mongoose');
const handleMongoosError = require('../helpers/handleMongooseError');

const contactSchema = new Schema(
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
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post('save', handleMongoosError);

const Contact = model('contact', contactSchema);

module.exports = Contact;
