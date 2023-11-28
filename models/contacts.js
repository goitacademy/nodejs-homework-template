const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
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

const Contact = mongoose.model("Contact", contactSchema);

const listContacts = async () => {
  return Contact.find();
};

const getContactById = async (contactId) => {
  return Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  return Contact.findByIdAndDelete(contactId);
};

const addContact = async (body) => {
  return Contact.create(body);
};

const updateContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
};

const updateStatusContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
