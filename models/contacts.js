const { v4 } = require('uuid');

const fs = require('fs/promises');

const path = require('path');
const contactsPath = path.join(__dirname, './contacts.json');

const updateContacts = newList => {
  fs.writeFile(contactsPath, JSON.stringify(newList));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contactsList = JSON.parse(data);
  return contactsList;
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contact = contacts.find(contact => contact.id === `${contactId}`);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === `${contactId}`);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(idx, 1);
  updateContacts(contacts);
  return removeContact;
};

const addContact = async (name, phone, email) => {
  const contacts = await listContacts();
  const nameArr = contacts.map(contact => contact.name);

  if (nameArr.includes(name)) {
    return null;
  }
  const newContact = { name, email, phone, id: v4() };
  contacts.push(newContact);
  updateContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...contacts[idx], ...body };

  updateContacts(contacts);
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
