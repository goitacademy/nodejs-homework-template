const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
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
  contactId: {
    type: String,
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
  },
});

const Contact = mongoose.model('contacts', contactSchema);

module.exports = {
  Contact,
};
