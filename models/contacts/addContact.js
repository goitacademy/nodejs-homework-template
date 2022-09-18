const { v4 } = require("uuid");
const listContacts = require("./listContacts");
const updateContactsBase = require("./updateContactsBase");

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...data };
  contacts.push(newContact);

  updateContactsBase(contacts);
  return newContact;
};

module.exports = addContact;
