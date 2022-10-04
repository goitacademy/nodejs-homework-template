const path = require('path');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');

const rewriteContacts = async contacts => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const contactList = await fs.readFile(contactsPath);
  return JSON.parse(contactList);
};

const getContactById = async contactId => {
  const contactList = await listContacts();
  const result = contactList.find(({ id }) => id === contactId);
  return result || null;
};

const removeContact = async contactId => {
  const contactList = await listContacts();
  const index = contactList.findIndex(({ id }) => id === contactId);

  if (index === -1) {
    return null;
  }

  const removedContact = contactList.splice(index, 1);
  rewriteContacts(contactList);
  return removedContact;
};

const addContact = async data => {
  const contact = {
    id: uuidv4(),
    ...data,
  };

  const contactList = await listContacts();
  contactList.push(contact);
  rewriteContacts(contactList);
  return contact;
};

const updateContact = async (contactId, data) => {
  const contactList = await listContacts();
  const index = contactList.findIndex(({ id }) => contactId === id);

  if (index === -1) {
    return null;
  }

  contactList[index] = { ...contactList[index], ...data };
  rewriteContacts(contactList);

  return contactList[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
