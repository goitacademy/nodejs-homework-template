const fs = require('fs/promises');
const path = require('path')
const contactsFilePath = path.join(__dirname, './contacts.json');

const listContacts = async () => JSON.parse(await fs.readFile(contactsFilePath, 'utf8'));

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find(({ id }) => id === contactId) || null;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: Date.now().toString(),
    ...body,
  };

  contacts.push(newContact);

  await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
  return contacts;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter((contact) => contact.id !== contactId);

  await fs.writeFile(contactsFilePath, JSON.stringify(updatedContacts, null, 2));
  return true;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  contacts[index] = { id: contactId, ...body };

  await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
