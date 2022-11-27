const { v4: uuidv4 } = require('uuid');
const updateContacts = require("./updateContact");
const listContacts = require("./listContacts");

const addContact = async (body) => {
    const contacts = await listContacts();
  const newContact = { body, id: uuidv4() };
  contacts.push(newContact);
  await updateContacts(contacts);
    return newContact;
}

module.exports = addContact;