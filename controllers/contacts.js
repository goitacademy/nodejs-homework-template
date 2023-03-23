const { Contact } = require("../models/contacts.js");

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};
const getContactById = async (_id) => {
  const contact = await Contact.findOne({ _id });
  return contact;
};

const removeContact = async (_id) => {
  try {
    return Contact.findByIdAndDelete({ _id });
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (name, email, phone, favorite) => {
  try {
    const contact = new Contact({ name, email, phone, favorite });
    contact.save();
    return contact;
  } catch (err) {
    throw err;
  }
};

const updateContact = (contactId, body) => {
  for (var i = 0; i < contactStorage.length; i++) {
    if (contactStorage[i].id == contactId) {
      contactStorage[i] = Object.assign({}, contactStorage[i], {
        ...body,
        id: contactStorage[i].id,
      });
      return;
    }
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
