const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ContactSchema = new Schema({
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

const Contact = mongoose.model("Contact", ContactSchema, "contacts");

const getContacts = async () => {
  const data = await Contact.find({});
  return data;
};

const getContactById = async (contactId) => {
  const data = await Contact.findById(contactId);
  return data;
};

const removeContact = async (contactId) => {
  const data = await Contact.deleteOne({ _id: contactId });
  return data;
};

const addContact = async (body) => {
  const contact = new Contact(body);
  const data = await contact.save();
  return data;
};

const updateContact = async (contactId, body) => {
  const data = await Contact.findOneAndUpdate({ _id: contactId }, body, {
    new: true,
  });
  return data;
};

const toggleFavoriteContact = async (contactId) => {
  const contact = await Contact.findById(contactId);
  const data = await Contact.findOneAndUpdate(
    { _id: contactId },
    { favorite: !contact.favorite },
    { new: true }
  );
  return data;
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  toggleFavoriteContact,
};
