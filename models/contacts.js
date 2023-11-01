

const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: String,
  phone: String,
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const removedContact = await Contact.findByIdAndRemove(contactId);

  if (removedContact) {
    return removedContact;
  } else {
    return null;
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const newContact = new Contact({ name, email, phone });

  const addedContact = await newContact.save();
  return addedContact;
};

const updateContact = async (contactId, body) => {
 const updatedContact = await Contact.findByIdAndUpdate(contactId, body);

 if(updatedContact){
  return updatedContact}
  else{
    return null
  }
  
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  Contact,
};
