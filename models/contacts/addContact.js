const { v4: uuidv4 } = require('uuid');
const updateContacts = require("./updateContact");
const listContacts = require("./listContacts");

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), ...data };
  contacts.push(newContact);
  await updateContacts(contacts);
    return newContact;
}

module.exports = addContact;