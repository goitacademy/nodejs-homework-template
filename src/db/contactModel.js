const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  }, 
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
});

const Contact = mongoose.model('contact', contactSchema);

module.exports = {
    Contact
}