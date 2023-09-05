const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
    owner: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
