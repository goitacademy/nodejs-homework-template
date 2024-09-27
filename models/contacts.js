const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((c) => c.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((c) => c.id === contactId);

  if (index === -1) {
    return false; // Contact not found
  }

  contacts.splice(index, 1);

  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return true; // Contact deleted
  } catch (error) {
    throw error;
  }
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: Date.now().toString(), ...body };
  contacts.push(newContact);

  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((c) => c.id === contactId);

  if (index === -1) {
    return null; // Contact not found
  }

  contacts[index] = { ...contacts[index], ...body };

  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
