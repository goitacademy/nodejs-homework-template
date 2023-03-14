const { Contact } = require("../models/contacts.js");

const contactStorage = require("../db/contacts.json");

const listContacts = () => {
  return contactStorage;
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

const addContact = (body) => {
  const existingIds = contactStorage.map((contact) => parseInt(contact.id));
  const newId = Math.max(...existingIds) + 1;
  const contact = new Contact(
    newId.toString(),
    body.name,
    body.email,
    body.phone
  );
  contactStorage.push(contact);
  return contact;
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
