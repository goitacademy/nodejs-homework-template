const fs = require("fs/promises");
const contacts = require("./contacts.json");

const listContacts = async () => {
  return contacts;
};

const getContactById = async (contactId) => {
  const findContactById = contacts.find(({ id }) => id === contactId);
  return findContactById;
};

const removeContact = async (contactId) => {
  const index = contacts.findIndex(({ id }) => id === Number(contactId));
  let isFindedContact;
  if (index === -1) {
    isFindedContact = false;
    return isFindedContact;
  }
  contacts.splice(index, 1);
  isFindedContact = true;
  return isFindedContact;
};

const addContact = async (body) => {
  const indexOfLastContact = contacts.length - 1;
  const idOfLastContact = contacts[indexOfLastContact].id;
  const newContact = { ...body, id: idOfLastContact + 1 };
  contacts.push(newContact);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const index = contacts.findIndex(({ id }) => id === Number(contactId));
  let isFindedContact;
  if (index === -1) {
    isFindedContact = false;
    return { isFindedContact };
  }
  isFindedContact = true;
  const updatedContact = { ...contacts[index], ...body };
  contacts[index] = updatedContact;
  return { updatedContact, isFindedContact };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
