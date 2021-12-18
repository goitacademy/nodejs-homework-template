const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");
const { v4 } = require("uuid");

const addContact = async (data) => {
  const newContact = { id: v4(), ...data };
  const contacts = await listContacts();
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

module.exports = addContact;
