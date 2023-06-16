const {Schema, model} = require('mongoose');
 
const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      unique:[true, 'Set email for contact'],
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  
})

const Contact = model('contact', contactSchema);

module.exports = Contact;