const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Contact name is required'],
  },
  email: String,
  phone: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
