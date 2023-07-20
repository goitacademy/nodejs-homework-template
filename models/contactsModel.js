// const fs = require('fs/promises')

// const listContacts = async () => {}

// const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

// const updateContact = async (contactId, body) => {}

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }

const { model, Schema } = require("mongoose");

const contactRolesEnum = require("../constans/contactRolesEnum");

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Dublicated email.."],
  },
  password: {
    type: String,
    required: true,
  },
  phone: Number,

  role: {
    type: String,
    enum: Object.values(contactRolesEnum),
    default: contactRolesEnum.USER,
  },
});

const Contact = model("Contact", contactSchema);

module.exports = Contact;
