const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../middlewares');

const contactDbSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
    },
    phone: {
      type: String,
      match: /^\(\d{3}\)[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/,
      required: [true, 'Set phone for contact'],
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

contactDbSchema.post('save', handleMongooseError);

const Contact = model('Contact', contactDbSchema);

module.exports = Contact;
