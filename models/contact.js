const { Schema, model } = require('mongoose');

const ContactSchema = new Schema(
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
      required: [true, 'Set phone for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

ContactSchema.post('save', (error, data, next) => {
  error.status = 400;
  next();
});

const Contact = model('contacts', ContactSchema);

module.exports = Contact;
