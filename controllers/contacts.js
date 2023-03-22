const { Contact } = require("../models/contacts.js");

const contactStorage = require("../startup/database.js");

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};
const getContactById = (contactId) => {
  return contactStorage.find((u) => u.id == contactId);
};

const removeContact = (contactId) => {
  const index = contactStorage.findIndex((u) => u.id == contactId);
  if (index > -1) {
    contactStorage.splice(index, 1);
    return true;
  }
  return false;
};

const addContact = async (name, email, phone, favorite) => {
  try {
    const contact = new Contact({ name, email, phone, favorite });
    contact.save;
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
