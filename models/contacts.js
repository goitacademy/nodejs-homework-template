const fs = require('fs/promises');
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");

const changeContacts = async (data) => {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  return contact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removeID = contacts.findIndex((contact) => contact.id === contactId);
  if (removeID === -1) {
    return null;
  }
  const [removeContacts] = contacts.splice(removeID, 1);
  changeContacts(contacts);

  return removeContacts;
}

const addContact = async (body) => {
  const newContact = {
    id: nanoid(),
    ...body,
  };
  const contacts = await listContacts();
  contacts.push(newContact);
  changeContacts(contacts);

  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const updateID = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (updateID === -1) {
    return null;
  };
  contacts[updateID] = {...contacts[updateID],...body };
  await changeContacts(contacts);
  return contacts[updateID];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}