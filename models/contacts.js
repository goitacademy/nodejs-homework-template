const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  const allContacts = JSON.parse(await fs.readFile(contactsPath));
  return allContacts;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((contact) => contact.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const contactIdx = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIdx === -1) {
    return null;
  }
  const newContacts = allContacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return allContacts[contactIdx];
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    return null;
  }
  contacts[contactIndex] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
