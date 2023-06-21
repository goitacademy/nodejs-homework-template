const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
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
})

const Contact = mongoose.model("contact", contactSchema);

const updateStatusContact = async (contactID, body) => {
  const contact = await Contact.findOneAndUpdate(contactID, body)

  return contact
}

module.exports = {
  Contact,
  updateStatusContact
}