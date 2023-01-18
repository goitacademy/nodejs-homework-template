const mongoose = require("mongoose")

const schemaContacts = mongoose.Schema({
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
const ContactModel = mongoose.model("contact", schemaContacts)

module.exports = {
 ContactModel 
}