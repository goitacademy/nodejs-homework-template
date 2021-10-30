const updateContacts = require("./updateContacts");
const crypto = require("crypto");

const contactsData = require("./contactsData");

const addContact = async ({ name, email, phone }) => {
  const contacts = await contactsData();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};
module.exports = addContact;
