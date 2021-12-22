const { v4 } = require("uuid");

const updateContacts = require("./updateContacts");

const listContacts = require("./listContacts");

const addContact = async (data) => {
  const newContact = { ...data, id: v4() };
  const contacts = await listContacts();
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

module.exports = addContact;
