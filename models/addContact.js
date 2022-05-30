const { v4 } = require("uuid");
const listContacts = require("./listContacts");
const updateContactsDB = require("./updateContactsDB");

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await updateContactsDB(contacts);
  return newContact;
};

module.exports = addContact;
