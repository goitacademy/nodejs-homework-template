const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
    name: String, // String is shorthand for {type: String}
    email: String,
    phone: String,
    favorite: Boolean,
  });
  
  const Contact = mongoose.model('Contact', contactSchema);

  module.exports = Contact;